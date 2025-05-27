import ProductPageLayout from "@/modules/categories/components/ProductPageLayout";
import React from "react";

import {
  BookOpen,
  Globe,
  Trophy,
  Film,
  Atom,
  Palette,
  Music,
  Gamepad2,
} from "lucide-react";
import CategoryCard from "@/modules/categories/components/CategoryCard";

const categories = [
  {
    id: "science",
    title: "Science & Nature",
    description:
      "Test your knowledge of biology, chemistry, physics, and the natural world",
    quizCount: 24,
    icon: Atom,
    color: "bg-green-500",
    image:
      "/placeholder.svg?height=200&width=300&query=science laboratory beakers microscope",
  },
  {
    id: "history",
    title: "History",
    description:
      "Journey through time with questions about world history and civilizations",
    quizCount: 18,
    icon: BookOpen,
    color: "bg-amber-500",
    image:
      "/placeholder.svg?height=200&width=300&query=ancient history books scrolls",
  },
  {
    id: "geography",
    title: "Geography",
    description:
      "Explore countries, capitals, landmarks, and geographical features",
    quizCount: 15,
    icon: Globe,
    color: "bg-blue-500",
    image:
      "/placeholder.svg?height=200&width=300&query=world map globe continents",
  },
  {
    id: "sports",
    title: "Sports",
    description:
      "From football to tennis, test your sports knowledge and trivia",
    quizCount: 21,
    icon: Trophy,
    color: "bg-orange-500",
    image:
      "/placeholder.svg?height=200&width=300&query=sports equipment soccer ball basketball",
  },
  {
    id: "movies",
    title: "Movies & TV",
    description: "Hollywood classics, blockbusters, and popular TV shows",
    quizCount: 32,
    icon: Film,
    color: "bg-purple-500",
    image:
      "/placeholder.svg?height=200&width=300&query=movie theater cinema film reel",
  },
  {
    id: "art",
    title: "Art & Literature",
    description:
      "Famous paintings, sculptures, books, and literary masterpieces",
    quizCount: 12,
    icon: Palette,
    color: "bg-pink-500",
    image:
      "/placeholder.svg?height=200&width=300&query=art palette paintbrush canvas books",
  },
  {
    id: "music",
    title: "Music",
    description:
      "Artists, albums, genres, and musical instruments from all eras",
    quizCount: 19,
    icon: Music,
    color: "bg-indigo-500",
    image:
      "/placeholder.svg?height=200&width=300&query=musical instruments guitar piano notes",
  },
  {
    id: "gaming",
    title: "Gaming",
    description: "Video games, board games, and gaming culture trivia",
    quizCount: 16,
    icon: Gamepad2,
    color: "bg-red-500",
    image:
      "/placeholder.svg?height=200&width=300&query=video game controller gaming setup",
  },
];

const CategoryPage = () => {
  return (
    <ProductPageLayout
      title="Quiz Categories"
      description="Choose your favorite topic and challenge yourself with our
            collection of engaging quizzes"
    >
      {categories.map((item) => (
        <CategoryCard key={item.id} category={item} />
      ))}
    </ProductPageLayout>
  );
};

export default CategoryPage;
