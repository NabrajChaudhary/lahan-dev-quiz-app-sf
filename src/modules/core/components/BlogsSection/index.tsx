"use client";
import Link from "next/link";

import { Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
// Remove this import
// import InContentAd from "./in-content-ad"

const featuredBlogs = [
  {
    id: 1,
    title: "10 Effective Study Techniques for Better Quiz Performance",
    description:
      "Discover proven methods to enhance your learning and ace your quizzes with these scientifically-backed study strategies.",
    category: "Study Tips",
    readTime: "5 min read",
    publishDate: "Dec 15, 2024",
    image: "/placeholder.svg?height=200&width=300",
    slug: "effective-study-techniques-quiz-performance",
  },
  {
    id: 2,
    title: "Understanding the 2025 Syllabus Updates",
    description:
      "Stay ahead with comprehensive insights into the latest curriculum changes and how they affect your preparation strategy.",
    category: "Updates",
    readTime: "7 min read",
    publishDate: "Dec 12, 2024",
    image: "/placeholder.svg?height=200&width=300",
    slug: "2025-syllabus-updates-guide",
  },
  {
    id: 3,
    title: "The Psychology Behind Multiple Choice Questions",
    description:
      "Learn how MCQs are designed and master the art of eliminating wrong answers to improve your success rate.",
    category: "Quiz Strategy",
    readTime: "6 min read",
    publishDate: "Dec 10, 2024",
    image: "/placeholder.svg?height=200&width=300",
    slug: "psychology-multiple-choice-questions",
  },
  {
    id: 4,
    title: "The Psychology Behind Multiple Choice Questions",
    description:
      "Learn how MCQs are designed and master the art of eliminating wrong answers to improve your success rate.",
    category: "Quiz Strategy",
    readTime: "6 min read",
    publishDate: "Dec 10, 2024",
    image: "/placeholder.svg?height=200&width=300",
    slug: "psychology-multiple-choice-questions",
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 md:py-24  ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-sm text-white font-medium shadow-md my-2">
            Educational Insights
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent">
              Latest from Our Blog
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with the latest study tips, educational insights, and
            quiz strategies to enhance your learning journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredBlogs.map((blog) => (
            <Card
              key={blog.id}
              className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-white/90 text-purple-700 hover:bg-white">
                  {blog.category}
                </Badge>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl group-hover:text-purple-600 transition-colors line-clamp-2">
                  {blog.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {blog.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.publishDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </div>
                <Link href={`/blogs/${blog.slug}`}>
                  <Button
                    variant="ghost"
                    className="w-full group/btn hover:bg-purple-50 cursor-pointer"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Remove this component from the JSX (the <!-- In-Content Advertisement --> section)
      <InContentAd /> */}

        <div className="text-center">
          <Link href="/blogs">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 cursor-pointer"
            >
              View All Blogs
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
