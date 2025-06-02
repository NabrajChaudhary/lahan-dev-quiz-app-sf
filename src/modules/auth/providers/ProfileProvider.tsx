/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { publicAxios } from "@/modules/core/utils/axios";
import React from "react";
import { deleteCookie } from "js-cookie-helper";
import { UserProfileType } from "@/modules/core/types/core.types";

type ContextTypes = {
  user: UserProfileType | null;
  // authenticate?: () => void;

  unAuthenticate: () => Promise<unknown> | void;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
};

const initialValues: ContextTypes = {
  user: null,
  setUser: () => {
    //
  },
  unAuthenticate: () => {
    //
    return Promise.resolve({});
  },
};

export const ProfileContext = React.createContext(initialValues);

interface Props {
  children: React.ReactNode;
  data: any | null;
}

async function clearAllSession() {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch (err) {
    console.error(err);
  }
}

const ProfileProvider = ({ children, data }: Props) => {
  const [user, setUser] = React.useState<UserProfileType | null>(data);

  const unAuthenticate = React.useCallback(() => {
    publicAxios.post("/auth/logout").then(() => {
      deleteCookie("auth-token");

      clearAllSession().then(() => window.location.reload());
    });
  }, []);

  React.useEffect(() => {
    if (!data) return;
  }, [data]);

  return (
    <ProfileContext.Provider
      value={{
        user,
        unAuthenticate,
        setUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
