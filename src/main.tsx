import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import "./index.css";
import App from "./App.tsx";
import { TeamsProvider } from "./contexts/TeamsConext";
import ErrorFallback from "./components/ErrorFallback.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary // Any error gets caught here
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <TeamsProvider>
        <App />
      </TeamsProvider>
    </ErrorBoundary>
  </StrictMode>,
);
