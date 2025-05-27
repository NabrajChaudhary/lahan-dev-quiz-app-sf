/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

const ProfileCard = () => {
  const { user, unAuthenticate } = useAuth();

  const router = useRouter();

  const handleNavigation = (path: string) => {
    if (path) {
      router.push(path);
    }

    // In a real app, you would use your router here
    // For Next.js: router.push(path)
    // For React Router: navigate(path)
  };

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="gap-2 px-3 py-1 h-auto  outline-none flex justify-start items-center"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user?.profilePhoto || "/placeholder.svg"}
              alt={user.name}
            />
            <AvatarFallback className="text-lg">
              {user?.firstName
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-900">
              {user.firstName}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleNavigation("/profile")}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={unAuthenticate}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    // </div>
  );
};

export default ProfileCard;
