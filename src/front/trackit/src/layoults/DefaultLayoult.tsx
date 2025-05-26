import { Outlet, useLocation, Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import * as React from "react";

export function DefaultLayoult() {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter((segment) => segment);

    if (pathSegments.length === 0) {
      return [{ label: "Início", path: "/" }];
    }

    return pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const label = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return { label, path };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <div className="flex-1 w-full min-h-screen relative">
          <header className="sticky top-0 z-10 h-16 px-4 flex items-center border-b bg-background">
            <SidebarTrigger className="ml-4" />
            <Breadcrumb className="ml-4">
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={crumb.path}>{crumb.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="px-12 py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
