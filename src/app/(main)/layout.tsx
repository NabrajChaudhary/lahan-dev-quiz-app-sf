import AuthProvider from "@/modules/auth/providers/AuthProvider";
import { getProfile } from "@/modules/auth/services/auth.services";
import Footer from "@/modules/core/components/Footer";
import Header from "@/modules/core/components/Header";
import { cookies } from "next/headers";
import React from "react";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");
  const auth = await getProfile({ token: token?.value });

  return (
    <AuthProvider data={auth?.data || null}>
      <Header />
      {children}
      <Footer />
    </AuthProvider>
  );
};

export default MainLayout;
