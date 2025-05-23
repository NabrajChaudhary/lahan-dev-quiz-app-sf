import Footer from "@/modules/core/components/Footer";
import Header from "@/modules/core/components/Header";
import React, { PropsWithChildren } from "react";

const MainLayout = ({ children }: { children: PropsWithChildren }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
