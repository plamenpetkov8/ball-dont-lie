import { useTeams } from "./contexts/TeamsConext";
import ErrorFallback from "./components/ErrorFallback";
import Header from "./components/Header";
import MainBody from "./components/MainBody";

import styles from "./App.module.css";

const App = () => {
  const { isLoading, error } = useTeams();

  // Error occured during data fetching
  if (error) {
    return (
      <ErrorFallback
        error={
          new Error(
            `An unexpected error occurred while fetching teams data: ${error}`,
          )
        }
        resetErrorBoundary={() => window.location.replace("/")}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <div
          className={styles.spinner}
          role="status"
          aria-label="Loading players data"
        />
      ) : (
        <div className={styles.container}>
          <Header />
          <MainBody />
        </div>
      )}
    </>
  );
};

export default App;
