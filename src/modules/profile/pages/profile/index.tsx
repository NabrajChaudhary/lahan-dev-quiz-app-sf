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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/core/components/ui/card";
import { QuizAttemptsItem } from "@/modules/dashboard/types/quiz-attempts.type";
import QuizStatistics from "@/modules/profile/components/QuizStatistics";
import RecentQuizes from "@/modules/profile/components/RecentQuizes";

import React from "react";

const ProfileModule = ({ data }: { data: Array<QuizAttemptsItem> }) => {
  const { user } = useAuth();

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
                    <AvatarFallback className="text-2xl">
                      {user?.firstName[0]}
                      {user?.lastName[0]}
                    </AvatarFallback>

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
            <QuizStatistics data={data} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* Recent Quizzes */}
            <RecentQuizes data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModule;
