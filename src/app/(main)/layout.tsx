import Footer from "@/modules/core/components/Footer";
import AdBanner from "@/modules/core/components/GoogleAdsene/AdBanner";
import Header from "@/modules/core/components/Header";

import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AdBanner
        dataAdFormat="auto"
        dataAdSlot="8670085054"
        dataFullWidthResponsive={true}
      />
      <Header />

      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
