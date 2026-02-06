import { FallbackProps } from "react-error-boundary";

import styles from "./ErrorFallback.module.css";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className={styles.container}>
      <div className={styles.errorContainer}>
        <h1>Something went wrong</h1>
        <p>
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
        </p>
        <button
          className="button"
          onClick={resetErrorBoundary}
          aria-label="Try fetching teams data again"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
