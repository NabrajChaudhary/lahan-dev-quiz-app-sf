"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import clsx from "clsx";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { user, unAuthenticate } = useAuth();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className={clsx("w-[300px] sm:w-[400px] p-2 flex")}
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            <span className="text-xl font-bold">lahanQuiz</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4">
          {user ? (
            <>
              <SheetClose asChild>
                <div className="flex justify-start items-center flex-col gap-2">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={user?.profilePhoto || "/placeholder.svg"}
                      alt={user.firstName}
                    />
                    <AvatarFallback className="text-lg">
                      {user?.firstName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-gray-900">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-md font-normal text-gray-900">
                      {user.email}
                    </span>
                  </div>
                </div>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/profile"
                  className="flex items-center py-2 text-base font-medium border-b border-border"
                >
                  Profile
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/dashboard"
                  className="flex items-center py-2 text-base font-medium border-b border-border"
                >
                  Dashboard
                </Link>
              </SheetClose>
            </>
          ) : null}

          <SheetClose asChild>
            <Link
              href="/"
              className="flex items-center py-2 text-base font-medium border-b border-border"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </SheetClose>

          {/* <SheetClose asChild>
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
          </SheetClose> */}
          <SheetClose asChild>
            <Link
              href="/quiz"
              className="flex items-center py-2 text-base font-medium border-b border-border"
              onClick={() => setOpen(false)}
            >
              Quiz
            </Link>
          </SheetClose>
          {!user ? (
            <div className="flex flex-col gap-2 pt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setOpen(false)}
                asChild
              >
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          ) : null}
        </nav>
        {user ? (
          <SheetClose asChild>
            <Button
              variant="ghost"
              className="gap-2 px-3 py-2 h-auto  outline-none flex justify-center items-center"
              onClick={unAuthenticate}
            >
              <div className="text-red-600 flex justify-start items-center">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </div>
            </Button>
          </SheetClose>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
