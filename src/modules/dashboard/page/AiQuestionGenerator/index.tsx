"use client";

import { useState } from "react";
import { useActionState } from "react";

import {
  Brain,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Copy,
  Trash,
} from "lucide-react";
import { generateQuestions } from "./actions/generate-questions";
import { Button } from "@/modules/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/core/components/ui/card";
import { Label } from "@/modules/core/components/ui/label";
import { Input } from "@/modules/core/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/core/components/ui/select";
import { Switch } from "@/modules/core/components/ui/switch";
import { Badge } from "@/modules/core/components/ui/badge";
import { QUESTION_API_URL } from "@/constants/env.constant";
import { getCookie } from "js-cookie-helper";

type IProps = {
  categoryOptions: Array<{
    _id: string;
    title: string;
    category_slug: string;
  }>;
};

export default function AiQuestionGenerator({ categoryOptions }: IProps) {
  console.log("🚀 ~ QUESTION_API_URL:", QUESTION_API_URL);
  const [state, action, isPending] = useActionState(generateQuestions, null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [preventDuplicates, setPreventDuplicates] = useState(true);

  const authToken = getCookie("auth-token");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  const questionUrl =
    process.env.NEXT_PUBLIC_QUESTION_API_URL || QUESTION_API_URL || "";
  const clearPreviousQuestions = () => {
    document.cookie = "previousQuestions=; path=/; max-age=0";
    alert("Previous questions history cleared!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Question Generator
            </h1>
          </div>
          <p className="text-gray-600">
            Generate questions automatically and post them to your API
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Question Configuration
              </CardTitle>
              <CardDescription>
                Configure the parameters for question generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={action} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    name="topic"
                    placeholder="e.g., JavaScript, History, Science"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="questionSlug">Question Slug</Label>
                  <Input
                    id="questionSlug"
                    name="questionSlug"
                    placeholder=""
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryId">Select Category</Label>
                  <input
                    type="hidden"
                    name="categoryId"
                    value={selectedCategory}
                  />

                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((item) => {
                        return (
                          <SelectItem value={item._id} key={item._id}>
                            {item.title}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    This will be used as the category field in the API payload
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiEndpoint">API Endpoint</Label>
                  <Input
                    id="apiEndpoint"
                    name="apiEndpoint"
                    placeholder="https://your-api.com/questions"
                    value={questionUrl}
                    readOnly
                    required
                  />
                  <p className="text-xs text-gray-500">
                    The endpoint where questions will be posted
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bearerToken">Bearer Token</Label>
                  <Input
                    id="bearerToken"
                    name="bearerToken"
                    type="password"
                    value={authToken || ""}
                    readOnly
                    placeholder="Your API authentication token"
                  />
                  <p className="text-xs text-gray-500">
                    Authentication token for your API (optional)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="count">Number of Questions</Label>
                    <Input
                      id="count"
                      name="count"
                      type="number"
                      min="1"
                      max="20"
                      defaultValue="5"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <input
                      type="hidden"
                      name="difficulty"
                      value={selectedDifficulty}
                    />
                    <Select
                      value={selectedDifficulty}
                      onValueChange={setSelectedDifficulty}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Prevent duplicates toggle */}
                <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                  <div>
                    <Label htmlFor="prevent-duplicates" className="font-medium">
                      Prevent Duplicate Questions
                    </Label>
                    <p className="text-xs text-gray-500">
                      Avoid generating questions similar to ones you&lsquo;ve
                      generated before
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="prevent-duplicates"
                      checked={preventDuplicates}
                      onCheckedChange={setPreventDuplicates}
                    />
                    <input
                      type="hidden"
                      name="preventDuplicates"
                      value={preventDuplicates.toString()}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={clearPreviousQuestions}
                      title="Clear question history"
                    >
                      <Trash className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating & Posting Questions...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Generate & Post Questions
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Status & Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                API Status
              </CardTitle>
              <CardDescription>
                View the status of your question generation and API posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!state && (
                <div className="text-center py-8 text-gray-500">
                  <p>Configure and submit the form to generate questions</p>
                  <p className="text-xs mt-2">
                    💡 Tip: Test your API endpoint first using the &quot;Test
                    API Endpoint&quot; button above
                  </p>
                </div>
              )}

              {state && (
                <div className="space-y-4">
                  {state.success ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">
                          Generation Complete!
                        </span>
                      </div>

                      {/* Show duplicate filtering info */}
                      {state.duplicatesFiltered &&
                        state.duplicatesFiltered > 0 && (
                          <div className="flex items-center gap-2 text-amber-600 text-sm">
                            <Badge variant="outline" className="bg-amber-50">
                              {state.duplicatesFiltered} duplicate questions
                              filtered out
                            </Badge>
                          </div>
                        )}

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-green-50 p-2 rounded">
                          <div className="font-medium text-green-800">
                            Successful
                          </div>
                          <div className="text-green-600">
                            {state.successCount} questions
                          </div>
                        </div>
                        {state.errorCount && state.errorCount > 0 && (
                          <div className="bg-red-50 p-2 rounded">
                            <div className="font-medium text-red-800">
                              Failed
                            </div>
                            <div className="text-red-600">
                              {state.errorCount} questions
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-medium">Error</span>
                    </div>
                  )}

                  <p className="text-sm text-gray-600">
                    {state.success ? state.message : state.error}
                  </p>

                  {state.success && state.apiResponses && (
                    <div className="space-y-2">
                      <Label>API Responses Summary</Label>
                      <div className="max-h-40 overflow-y-auto">
                        {state.apiResponses.map((response, index) => (
                          <div
                            key={index}
                            className={`text-xs p-2 rounded mb-1 ${
                              response.success
                                ? "bg-green-50 text-green-800"
                                : "bg-red-50 text-red-800"
                            }`}
                          >
                            Question {response.questionIndex}:{" "}
                            {response.success
                              ? "Posted successfully"
                              : `Failed - ${response.error}`}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Generated Questions Display */}
        {state?.success && state.questions && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Questions & API Payloads</CardTitle>
              <CardDescription>
                {state.questions.length} questions generated and posted to your
                API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {state.questions.map((question, index) => {
                  const apiResponse = state.apiResponses?.[index];
                  const payload = apiResponse?.payload;

                  return (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-lg">
                          {index + 1}. {question.question}
                        </h3>
                        <div className="flex gap-2">
                          <Badge
                            variant={
                              apiResponse?.success ? "default" : "destructive"
                            }
                          >
                            {apiResponse?.success ? "Posted" : "Failed"}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <Label className="text-sm font-medium">
                            Options:
                          </Label>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            {question.options.map((option, optIndex) => (
                              <li
                                key={optIndex}
                                className={
                                  option === question.correctAnswer
                                    ? "text-green-600 font-medium"
                                    : ""
                                }
                              >
                                {option}{" "}
                                {option === question.correctAnswer && "✓"}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">
                            Explanation:
                          </Label>
                          <p className="text-sm text-gray-600">
                            {question.explanation}
                          </p>
                        </div>

                        {payload && (
                          <div className="bg-gray-50 p-3 rounded">
                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-sm font-medium">
                                API Payload:
                              </Label>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(
                                    JSON.stringify(payload, null, 2)
                                  )
                                }
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
                              {JSON.stringify(payload, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
