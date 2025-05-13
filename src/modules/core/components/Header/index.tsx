import { BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex gap-2 items-center text-xl font-bold">
            <BookOpen className="h-6 w-6 text-primary" />
            <span>NepalQuiz</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-4 py-2"
            >
              Features
            </Link>
            <Link
              href="#exams"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-4 py-2"
            >
              Exams
            </Link>
            <Link
              href="#demo"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-4 py-2"
            >
              Demo
            </Link>
            <Button variant="outline" className="mr-2" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signin">Sign up</Link>
            </Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <MobileNav />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
