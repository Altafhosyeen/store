import { RouterProvider } from "react-router-dom";
import { AntdProvider } from "@/app/providers/AntdProvider";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { router } from "@/app/router";

/**
 * Provider order matters: AuthProvider issues a query, so it must sit inside
 * QueryProvider; both sit inside AntdProvider so their fallbacks are themed.
 */
const App = () => (
  <AntdProvider>
    <ErrorBoundary>
      <QueryProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundary>
  </AntdProvider>
);

export default App;
