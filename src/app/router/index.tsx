import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

export const router = createBrowserRouter(routes);

export * from "./PermissionRoute";
export * from "./ProtectedRoute";
export * from "./PublicRoute";
export * from "./RoleRoute";
