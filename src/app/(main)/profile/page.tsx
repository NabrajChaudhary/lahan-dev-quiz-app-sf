"use client";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/modules/core/components/ui/avatar";
import { Badge } from "@/modules/core/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/core/components/ui/card";
import { Clock } from "lucide-react";
import React from "react";

const ProfilePage = () => {
  const { user } = useAuth();

  const recentQuizzes = [
    {
      name: "React Hooks",
      score: 92,
      date: "2 days ago",
      difficulty: "Intermediate",
    },
    {
      name: "JavaScript ES6+",
      score: 88,
      date: "5 days ago",
      difficulty: "Advanced",
    },
    {
      name: "CSS Grid & Flexbox",
      score: 95,
      date: "1 week ago",
      difficulty: "Intermediate",
    },
    {
      name: "Node.js Fundamentals",
      score: 78,
      date: "1 week ago",
      difficulty: "Beginner",
    },
    {
      name: "TypeScript Basics",
      score: 91,
      date: "2 weeks ago",
      difficulty: "Intermediate",
    },
  ];

  const quizStats = {
    totalQuizzes: 47,
    averageScore: 85,
    bestScore: 98,
    totalTime: "12h 34m",
    streak: 7,
    rank: "Advanced",
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">
            View your account details and quiz progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={user?.profilePhoto || "/placeholder.svg"}
                      alt={`${user?.firstName} ${user?.lastName}`}
                    />
                    {/* <AvatarFallback className="text-2xl">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback> */}

                    <AvatarFallback className="text-5xl font-bold">
                      {user?.firstName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">
                  {user?.firstName} {user?.lastName}
                </CardTitle>
                <CardDescription>{user?.email}</CardDescription>
                <div className="flex gap-2 justify-center">
                  <Badge
                    variant="outline"
                    className="mt-2 capitalize text-md  px-2 py-1"
                  >
                    {user?.userType} Account
                  </Badge>
                </div>
              </CardHeader>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quiz Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Quizzes</span>
                  <span className="font-semibold">
                    {quizStats.totalQuizzes}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Score</span>
                  <span className="font-semibold">
                    {quizStats.averageScore}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Best Score</span>
                  <span className="font-semibold">{quizStats.bestScore}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Streak</span>
                  <span className="font-semibold">{quizStats.streak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Time</span>
                  <span className="font-semibold">{quizStats.totalTime}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* Recent Quizzes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Quizzes
                </CardTitle>
                <CardDescription>
                  Your latest quiz attempts and scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuizzes.map((quiz, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {quiz.name}
                        </h4>
                        <p className="text-sm text-gray-600">{quiz.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getDifficultyColor(quiz.difficulty)}>
                          {quiz.difficulty}
                        </Badge>
                        <div className="text-right">
                          <div className="font-semibold text-lg">
                            {quiz.score}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
