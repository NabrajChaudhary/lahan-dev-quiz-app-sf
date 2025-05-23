"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] p-2">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            <span className="text-xl font-bold">lahanQuiz</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4">
          <SheetClose asChild>
            <Link
              href="#features"
              className="flex items-center py-2 text-base font-medium border-b border-border"
              onClick={() => setOpen(false)}
            >
              Features
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="#exams"
              className="flex items-center py-2 text-base font-medium border-b border-border"
              onClick={() => setOpen(false)}
            >
              Exams
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="#demo"
              className="flex items-center py-2 text-base font-medium border-b border-border"
              onClick={() => setOpen(false)}
            >
              Demo
            </Link>
          </SheetClose>
          <div className="flex flex-col gap-2 pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setOpen(false)}
              asChild
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => setOpen(false)}
              asChild
            >
              <Link href="/signin">Sign up</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
