"use client";

import type React from "react";
import { useEffect, useState } from "react";

import { getCookie } from "js-cookie-helper";
import ProfileProvider from "./ProfileProvider";
import { publicAxios } from "@/modules/core/utils/axios";
import type { UserProfileType } from "@/modules/core/types/core.types";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileData, setProfileData] = useState<UserProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log("🚀 ~ AuthProvider ~ isLoading:", isLoading);

  const fetchProfile = async () => {
    const authToken = getCookie("auth-token");

    if (!authToken) {
      setProfileData(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await publicAxios.get("/auth/profile");
      setProfileData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      setProfileData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial profile fetch on mount
    fetchProfile();

    // Listen for custom auth events
    const handleAuthSuccess = () => {
      // Small delay to ensure cookies are set
      setTimeout(() => {
        fetchProfile();
      }, 100);
    };

    const handleAuthLogout = () => {
      setProfileData(null);
    };

    window.addEventListener("auth:success", handleAuthSuccess);
    window.addEventListener("auth:logout", handleAuthLogout);

    return () => {
      window.removeEventListener("auth:success", handleAuthSuccess);
      window.removeEventListener("auth:logout", handleAuthLogout);
    };
  }, []);

  return (
    // <SessionProvider>
    <ProfileProvider data={profileData}>{children}</ProfileProvider>
    // </SessionProvider>
  );
};

export default AuthProvider;
