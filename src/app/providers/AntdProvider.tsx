import { App as AntdApp, ConfigProvider } from "antd";
import type { PropsWithChildren } from "react";
import { antdTheme } from "@/theme";

/**
 * AntdApp supplies the message/notification/modal instances that read the
 * current theme; the static `message.*` imports do not and are avoided.
 */
export const AntdProvider = ({ children }: PropsWithChildren) => (
  <ConfigProvider theme={antdTheme} direction="ltr">
    <AntdApp>{children}</AntdApp>
  </ConfigProvider>
);
