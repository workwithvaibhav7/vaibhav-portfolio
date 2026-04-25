import { lazy, Suspense } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
import { LoadingProvider } from "./context/LoadingProvider";

const isDashboard = window.location.pathname === "/dashboard";

const App = () => {
  if (isDashboard) {
    return (
      <Suspense fallback={<div style={{ background: "#0d0d1a", minHeight: "100vh" }} />}>
        <Dashboard />
      </Suspense>
    );
  }

  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
