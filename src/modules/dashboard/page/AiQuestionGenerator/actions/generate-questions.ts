"use server";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { cookies } from "next/headers";

// Initialize Google AI with explicit API key
const google = createGoogleGenerativeAI({
  apiKey:
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_AI_API_KEY,
});

const questionSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctAnswer: z.string(),
      explanation: z.string(),
      difficulty: z.string(),
    })
  ),
});

// Function to check if a question is similar to existing ones
function isSimilarQuestion(
  newQuestion: string,
  existingQuestions: string[]
): boolean {
  // Convert to lowercase for case-insensitive comparison
  const normalizedNew = newQuestion.toLowerCase().trim();

  // Check for exact matches or high similarity
  for (const existing of existingQuestions) {
    const normalizedExisting = existing.toLowerCase().trim();

    // Exact match
    if (normalizedNew === normalizedExisting) {
      return true;
    }

    // Check if they're very similar (80% or more of the words are the same)
    const newWords = normalizedNew.split(/\s+/).filter((w) => w.length > 3);
    const existingWords = normalizedExisting
      .split(/\s+/)
      .filter((w) => w.length > 3);

    let matchCount = 0;
    for (const word of newWords) {
      if (existingWords.includes(word)) {
        matchCount++;
      }
    }

    const similarity = newWords.length > 0 ? matchCount / newWords.length : 0;
    if (similarity > 0.8) {
      return true;
    }
  }

  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateQuestions(prevState: any, formData: FormData) {
  try {
    const topic = formData.get("topic") as string;
    const categoryId = formData.get("categoryId") as string;
    const count = Number.parseInt(formData.get("count") as string);
    const difficulty = formData.get("difficulty") as string;
    const apiEndpoint = formData.get("apiEndpoint") as string;
    const bearerToken = formData.get("bearerToken") as string;
    const preventDuplicates = formData.get("preventDuplicates") === "true";

    if (!topic || !count || !categoryId || !apiEndpoint) {
      return {
        success: false,
        error: "Topic, category ID, count, and API endpoint are required",
      };
    }

    // Check if API key is available
    if (
      !process.env.GOOGLE_GENERATIVE_AI_API_KEY &&
      !process.env.GOOGLE_AI_API_KEY
    ) {
      return { success: false, error: "Google AI API key is not configured" };
    }

    // Get previously generated questions from cookies
    let previousQuestions: string[] = [];
    if (preventDuplicates) {
      const cookieStore = cookies();
      const previousQuestionsJson = (await cookieStore).get(
        "previousQuestions"
      )?.value;
      if (previousQuestionsJson) {
        try {
          previousQuestions = JSON.parse(previousQuestionsJson);
        } catch (e) {
          console.error("Error parsing previous questions:", e);
          previousQuestions = [];
        }
      }
    }

    // Create a prompt that emphasizes uniqueness
    const uniquenessInstruction =
      preventDuplicates && previousQuestions.length > 0
        ? `IMPORTANT: Generate UNIQUE questions that are different from these previously generated questions: 
         "${previousQuestions.slice(0, 10).join('", "')}"`
        : "";

    const prompt = `Generate ${count} ${difficulty} multiple choice questions about ${topic}. 
    Each question should have:
    - A clear question
    - Exactly 4 options (one correct, three incorrect)
    - The correct answer (must match one of the options exactly)
    - A brief explanation of why the answer is correct
    
    Make sure the questions are educational, accurate, and UNIQUE from each other.
    ${uniquenessInstruction}
    
    Ensure each question covers a different aspect of the topic.`;

    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: questionSchema,
      prompt,
    });

    // Filter out similar questions
    const uniqueQuestions = [];
    const duplicateIndices = [];

    for (let i = 0; i < object.questions.length; i++) {
      const question = object.questions[i];
      if (
        !preventDuplicates ||
        !isSimilarQuestion(question.question, previousQuestions)
      ) {
        uniqueQuestions.push(question);
        // Add to previous questions for future checks
        previousQuestions.push(question.question);
      } else {
        duplicateIndices.push(i);
      }
    }

    // Update the cookie with new questions (limit to last 100 to avoid cookie size issues)
    if (preventDuplicates) {
      const cookieStore = cookies();
      (await cookieStore).set(
        "previousQuestions",
        JSON.stringify(previousQuestions.slice(-100)),
        {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: "/",
        }
      );
    }

    // If we filtered out duplicates, log it
    if (duplicateIndices.length > 0) {
      console.log(
        `Filtered out ${duplicateIndices.length} duplicate questions`
      );
    }

    const apiResponses = [];
    const errors = [];

    // Post each unique question individually
    for (let i = 0; i < uniqueQuestions.length; i++) {
      const question = uniqueQuestions[i];

      const questionPayload = {
        question: question.question,
        category: categoryId,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        difficulty: question.difficulty,
      };

      try {
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        // Add Authorization header if bearer token is provided
        if (bearerToken) {
          headers["Authorization"] = `Bearer ${bearerToken}`;
        }

        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers,
          body: JSON.stringify(questionPayload),
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        apiResponses.push({
          questionIndex: i + 1,
          success: true,
          response: result,
          payload: questionPayload,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        errors.push({
          questionIndex: i + 1,
          error: errorMessage,
          payload: questionPayload,
        });
        apiResponses.push({
          questionIndex: i + 1,
          success: false,
          error: errorMessage,
          payload: questionPayload,
        });
      }
    }

    return {
      success: true,
      questions: uniqueQuestions.map((q, index) => ({
        ...q,
        category: categoryId,
        questionNumber: index + 1,
      })),
      apiResponses: apiResponses,
      errors: errors,
      successCount: apiResponses.filter((r) => r.success).length,
      errorCount: errors.length,
      duplicatesFiltered: duplicateIndices.length,
      message: `Generated ${uniqueQuestions.length} unique questions. ${
        apiResponses.filter((r) => r.success).length
      } posted successfully, ${errors.length} failed.${
        duplicateIndices.length > 0
          ? ` (${duplicateIndices.length} duplicates filtered out)`
          : ""
      }`,
    };
  } catch (error) {
    console.error("Error generating questions:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate questions",
    };
  }
}
