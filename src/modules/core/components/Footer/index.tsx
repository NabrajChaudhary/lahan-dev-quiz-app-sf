import { BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background flex justify-center">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <BookOpen className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose md:text-left">
            © 2025 LahanQuiz. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm underline underline-offset-4">
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-sm underline underline-offset-4"
          >
            Privacy
          </Link>
          <Link href="#" className="text-sm underline underline-offset-4">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
