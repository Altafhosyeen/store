import { Button, Result } from "antd";
import { Component, type ErrorInfo, type PropsWithChildren } from "react";
import { isDevelopment } from "@/app/config/env.config";

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Last resort for render-time crashes. Data-fetching failures are handled by
 * the pages themselves; anything reaching here is a genuine bug.
 */
export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Unhandled render error", error, errorInfo);
  }

  private readonly handleReload = (): void => {
    globalThis.location.reload();
  };

  render() {
    const { error } = this.state;

    if (!error) {
      return this.props.children;
    }

    return (
      <Result
        status="error"
        title="Something went wrong"
        subTitle={
          isDevelopment ? error.message : "The page failed to render. Please reload and try again."
        }
        extra={
          <Button type="primary" onClick={this.handleReload}>
            Reload page
          </Button>
        }
      />
    );
  }
}
