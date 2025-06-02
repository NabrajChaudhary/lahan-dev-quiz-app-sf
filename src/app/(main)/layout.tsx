import Footer from "@/modules/core/components/Footer";
import Header from "@/modules/core/components/Header";

import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
