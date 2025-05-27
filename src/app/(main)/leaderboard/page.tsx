import React from "react";
import { Trophy, Medal, Award } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/modules/core/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/modules/core/components/ui/avatar";
import { Badge } from "@/modules/core/components/ui/badge";

const users = [
  {
    rank: 1,
    name: "Alex Chen",
    score: 15420,
    avatar: "/placeholder.svg?height=40&width=40&query=person avatar male",
  },
  {
    rank: 2,
    name: "Sarah Johnson",
    score: 14850,
    avatar: "/placeholder.svg?height=40&width=40&query=person avatar female",
  },
  {
    rank: 3,
    name: "Mike Rodriguez",
    score: 14200,
    avatar:
      "/placeholder.svg?height=40&width=40&query=person avatar male hispanic",
  },
  {
    rank: 4,
    name: "Emma Wilson",
    score: 13890,
    avatar:
      "/placeholder.svg?height=40&width=40&query=person avatar female blonde",
  },
  {
    rank: 5,
    name: "David Kim",
    score: 13650,
    avatar:
      "/placeholder.svg?height=40&width=40&query=person avatar male asian",
  },
  {
    rank: 6,
    name: "Lisa Brown",
    score: 13200,
    avatar:
      "/placeholder.svg?height=40&width=40&query=person avatar female brunette",
  },
  {
    rank: 7,
    name: "Tom Wilson",
    score: 12800,
    avatar:
      "/placeholder.svg?height=40&width=40&query=person avatar male beard",
  },
  {
    rank: 8,
    name: "Anna Davis",
    score: 12500,
    avatar:
      "/placeholder.svg?height=40&width=40&query=person avatar female redhead",
  },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />;
    default:
      return <span className="text-lg font-bold text-slate-600">#{rank}</span>;
  }
};

export default function Component() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Leaderboard</h1>

        <Card>
          <CardHeader>
            <CardTitle>Top Players</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {users.map((user) => (
              <div
                key={user.rank}
                className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
              >
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(user.rank)}
                </div>

                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="font-medium">{user.name}</div>
                </div>

                <Badge variant="secondary">
                  {user.score.toLocaleString()} pts
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
