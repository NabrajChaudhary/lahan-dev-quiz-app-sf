import { Badge } from "@/modules/core/components/ui/badge";
import { Button } from "@/modules/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/core/components/ui/card";
import Link from "next/link";
import React from "react";
import Image from "next/image";

type Props = {
  category: {
    id: string;
    title: string;
    description: string;
    quizCount: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    color: string;
    image: string;
  };
};

const CategoryCard = ({ category }: Props) => {
  const IconComponent = category.icon;
  return (
    <Card
      key={category.id}
      className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative">
        <Image
          src={category.image || "/placeholder.svg"}
          alt={category.title}
          width={300}
          height={200}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div
          className={`absolute top-4 left-4 p-2 rounded-full ${category.color} text-white`}
        >
          <IconComponent className="h-5 w-5" />
        </div>
        <Badge className="absolute top-4 right-4 bg-white/90 text-slate-700 hover:bg-white">
          {category.quizCount} quizzes
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          {category.title}
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 line-clamp-2">
          {category.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <Button
          asChild
          className="w-full group-hover:bg-slate-900 transition-colors"
        >
          <Link href={`/quiz/${category.id}`}>Start Quiz</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
