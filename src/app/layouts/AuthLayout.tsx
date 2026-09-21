import { Card, Layout } from "antd";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { PageLoader } from "./components/PageLoader";

/**
 * Centered card shell for login, register and password recovery.
 * Deliberately chrome-free so the form is the first thing read; each page
 * owns its own heading.
 */
export const AuthLayout = () => (
  <Layout className="flex min-h-dvh items-center justify-center px-4 py-10">
    <div className="w-full max-w-md">
      <Card>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Card>
    </div>
  </Layout>
);
