import React, { useEffect, useState, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import Header from "./common/Header";
import TourPage from "./tour/TourPage";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./login/Login";
import { Spinner } from "./common/Spinner";
import { useSigninCheck } from "reactfire";
import AgentsPage from "./agents/AgentsPage";
import TourDetailsPage from "./tour/TourDetailsPage";
export const WindowWidthContext = createContext();

function App() {
  const { status, data: signinResult } = useSigninCheck();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

    return () =>
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
  }, []);

  if (status === "loading") {
    return <Spinner />;
  }

  const { signedIn, user } = signinResult;

  return signedIn === true ? (
    <>
      <WindowWidthContext.Provider value={windowWidth}>
        <Header user={user} />
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/tours" component={TourPage} />
            <Route path="/tour/:id" component={TourDetailsPage} />
            <Route path="/agents" component={AgentsPage} />
            <Route component={PageNotFound} />
          </Switch>
          <ToastContainer autoClose={3000} hideProgressBar />
        </div>
      </WindowWidthContext.Provider>
    </>
  ) : (
    <Login windowWidth={windowWidth} />
  );
}

export default App;
