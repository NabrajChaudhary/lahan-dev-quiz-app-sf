"use client";
import PaginationComponent from "@/modules/core/components/Pagination";
import { Badge } from "@/modules/core/components/ui/badge";
import { Button } from "@/modules/core/components/ui/button";
import { Card, CardContent } from "@/modules/core/components/ui/card";

import { Loader2, Trash } from "lucide-react";
import React from "react";

// type Props = {}

interface Question {
  _id: string;
  question: string;
  options: string[];
  correct_answer: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any;
  difficulty: string;
  type: string;
  correctAnswer: string;
  explanation: string;
}

// interface ApiResponse {
//   questions: Question[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }

const QuestionsList = () => {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const questionsPerPage = 10;

  const fetchQuestions = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:8000/api/questions?page=${page}&limit=${questionsPerPage}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch questions: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Handle the API response structure
      if (data.data && Array.isArray(data.data)) {
        // API returns object with data array and pagination info
        setQuestions(data.data);
        setTotal(data.total || data.data.length);
        setTotalPages(
          data.totalPages ||
            Math.ceil((data.total || data.data.length) / questionsPerPage)
        );
        setCurrentPage(data.currentPage || page);
      } else if (Array.isArray(data)) {
        // Fallback: if API returns array directly
        setQuestions(data);
        setTotal(data.length);
        setTotalPages(Math.ceil(data.length / questionsPerPage));
      } else {
        // Fallback: single question object
        setQuestions([data]);
        setTotal(1);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Fetch error:", err); // Debug log
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching questions"
      );
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchQuestions(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  //   const getDifficultyColor = (difficulty: string) => {
  //     switch (difficulty?.toLowerCase()) {
  //       case "easy":
  //         return "bg-green-100 text-green-800 hover:bg-green-200";
  //       case "medium":
  //         return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
  //       case "hard":
  //         return "bg-red-100 text-red-800 hover:bg-red-200";
  //       default:
  //         return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  //     }
  //   };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-lg">Loading questions...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  Error Loading Questions
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button
                  onClick={() => fetchQuestions(currentPage)}
                  variant="outline"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Questions</h1>
        <p className="text-gray-600">
          Browse through our collection of questions. Total: {total} questions
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-4 mb-8">
        {questions.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold mb-2">
                  No Questions Found
                </h3>
                <p className="text-gray-600">
                  There are no questions available at the moment.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          questions.map((question, index) => {
            return (
              <Card
                key={question._id || index}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-3 relative">
                  <div className="flex  items-center gap-4">
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className="text-sm font-medium">
                        #{(currentPage - 1) * questionsPerPage + index + 1}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <p className="text-lg leading-relaxed mb-3">
                          {question.question}
                        </p>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          {question.category?.title ||
                            question.category ||
                            "General"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="text-red-500 cursor-pointer hover:text-red-400 absolute right-2 top-10"
                  >
                    <Trash />
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Pagination */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={questionsPerPage}
        totalItems={total}
        showInfo={true}
      />
    </div>
  );
};

export default QuestionsList;
