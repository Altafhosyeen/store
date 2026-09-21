import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { setupMocks } from "./mocks";
import "./styles/globals.css";

const mount = (): void => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

// The mock transport must be installed before the first request, so mounting
// waits on it. Resolves immediately unless VITE_ENABLE_MOCK is on.
void setupMocks().then(mount);
