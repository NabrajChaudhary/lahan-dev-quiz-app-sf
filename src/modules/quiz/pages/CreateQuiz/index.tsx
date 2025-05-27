"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Trash2, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/modules/core/components/ui/card";
import { Button } from "@/modules/core/components/ui/button";
import { Label } from "@/modules/core/components/ui/label";
import { Input } from "@/modules/core/components/ui/input";
import { Textarea } from "@/modules/core/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/core/components/ui/select";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";

// Zod schema for form validation
const quizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  description: z.string().optional(),
  questions: z
    .array(
      z.object({
        question: z.string().min(1, "Question text is required"),
        category: z.string().min(1, "Category is required"),
        type: z.enum(["multiple-choice", "text"]),
        options: z.array(z.string()).length(4).optional(),
        correctAnswer: z.string().optional(),
      })
    )
    .min(1, "At least one question is required")
    .max(25, "Maximum 25 questions allowed"),
});

type QuizFormData = z.infer<typeof quizSchema>;

const CreateQuizForm = ({
  categories,
}: {
  categories: Array<{ _id: string; title: string }>;
}) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      description: "",
      questions: [
        {
          question: "",
          category: "",
          type: "multiple-choice",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const categoriesData = categories || [];

  //   const categories = [
  //     "General Knowledge",
  //     "Science",
  //     "History",
  //     "Geography",
  //     "Sports",
  //     "Entertainment",
  //     "Technology",
  //     "Literature",
  //     "Art",
  //     "Music",
  //     "Mathematics",
  //     "Politics",
  //     "Business",
  //     "Health",
  //     "Food & Cooking",
  //     "Travel",
  //     "Nature",
  //     "Philosophy",
  //     "Psychology",
  //     "Other",
  //   ];

  const addQuestion = () => {
    axios.post("/questions/create", {});
    if (fields.length >= 25) {
      alert("Maximum 25 questions allowed");
      return;
    }
    append({
      question: "",
      category: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
  };

  const onSubmit = (data: QuizFormData) => {
    console.log("Quiz Data:", data);
    // Handle form submission here
    alert("Quiz created successfully! Check console for data.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Quiz Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Quiz Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter quiz title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Quiz Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter quiz description"
                rows={3}
              />
            </div>

            {fields.map((field, questionIndex) => (
              <Card key={field.id} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      Question {questionIndex + 1}
                    </CardTitle>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => remove(questionIndex)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Question Text */}
                  <div className="space-y-2">
                    <Label htmlFor={`questions.${questionIndex}.question`}>
                      Question Text
                    </Label>
                    <Textarea
                      {...register(`questions.${questionIndex}.question`)}
                      placeholder="Enter your question"
                      rows={2}
                    />
                    {errors.questions?.[questionIndex]?.question && (
                      <p className="text-sm text-red-500">
                        {errors.questions[questionIndex]?.question?.message}
                      </p>
                    )}
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={watch(`questions.${questionIndex}.category`)}
                      onValueChange={(value) =>
                        setValue(`questions.${questionIndex}.category`, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesData.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.questions?.[questionIndex]?.category && (
                      <p className="text-sm text-red-500">
                        {errors.questions[questionIndex]?.category?.message}
                      </p>
                    )}
                  </div>

                  {/* Question Type */}
                  <div className="space-y-2">
                    <Label>Question Type</Label>
                    <Select
                      value={watch(`questions.${questionIndex}.type`)}
                      onValueChange={(value) =>
                        setValue(
                          `questions.${questionIndex}.type`,
                          value as "multiple-choice" | "text"
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple-choice">
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value="text">Text Answer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Multiple Choice Options */}
                  {watch(`questions.${questionIndex}.type`) ===
                    "multiple-choice" && (
                    <div className="space-y-3">
                      <Label>Answer Options (4 required)</Label>

                      {[0, 1, 2, 3].map((optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center gap-2"
                        >
                          <span className="text-sm font-medium w-8">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          <Input
                            {...register(
                              `questions.${questionIndex}.options.${optionIndex}`
                            )}
                            placeholder={`Option ${String.fromCharCode(
                              65 + optionIndex
                            )}`}
                            className="flex-1"
                          />
                        </div>
                      ))}

                      {/* Correct Answer Selection */}
                      <div className="space-y-2">
                        <Label>Correct Answer</Label>
                        <Select
                          value={
                            watch(`questions.${questionIndex}.correctAnswer`) ||
                            ""
                          }
                          onValueChange={(value) =>
                            setValue(
                              `questions.${questionIndex}.correctAnswer`,
                              value
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select correct answer" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3].map((optionIndex) => {
                              const option = watch(
                                `questions.${questionIndex}.options.${optionIndex}`
                              );
                              return (
                                <SelectItem
                                  key={optionIndex}
                                  value={option || `option-${optionIndex}`}
                                >
                                  {String.fromCharCode(65 + optionIndex)}.{" "}
                                  {option ||
                                    `Option ${String.fromCharCode(
                                      65 + optionIndex
                                    )}`}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Text Answer */}
                  {watch(`questions.${questionIndex}.type`) === "text" && (
                    <div className="space-y-2">
                      <Label
                        htmlFor={`questions.${questionIndex}.correctAnswer`}
                      >
                        Expected Answer (Optional)
                      </Label>
                      <Input
                        {...register(
                          `questions.${questionIndex}.correctAnswer`
                        )}
                        placeholder="Enter expected answer"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Questions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Questions</h3>
                <Button
                  type="button"
                  onClick={addQuestion}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  disabled={fields.length >= 25}
                >
                  <Plus className="h-4 w-4" />
                  Add Question ({fields.length}/25)
                </Button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" className="px-8">
                Create Quiz
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuizForm;
