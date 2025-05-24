"use client";

import React from "react";

// import { SessionProvider } from "next-auth/react";
import ProfileProvider from "./ProfileProvider";

// import { ProfileUser } from '../types/user.types';

// import ProfileProvider from './ProfileProvider';

const AuthProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any | null;
}) => {
  return (
    // <SessionProvider refetchInterval={30}>
    <ProfileProvider data={data}>{children}</ProfileProvider>
    // </SessionProvider>
  );
};

export default AuthProvider;
