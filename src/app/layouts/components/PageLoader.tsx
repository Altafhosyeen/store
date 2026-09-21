import { Spin } from "antd";

/** Suspense fallback for lazily loaded route chunks. */
export const PageLoader = () => (
  <div className="flex min-h-64 items-center justify-center">
    <Spin size="large" />
  </div>
);
