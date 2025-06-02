import {
  SidebarInset,
  SidebarProvider,
} from "@/modules/core/components/ui/sidebar";
import { AppSidebar } from "@/modules/dashboard/layout/DashboardLayout";
import React, { PropsWithChildren } from "react";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="p-3">{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default AdminLayout;
