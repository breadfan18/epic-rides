import React, { useEffect, useState, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import Header from "./common/Header";
import CardsPage from "./cards/CardsPage";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./login/Login";
import { Spinner } from "./common/Spinner";
import { useSigninCheck } from "reactfire";
import MainPage from "./MainPage";
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
            <Route path="/main" component={CardsPage} />
            {/* <Route path="/card/:id" component={CardDetailsPage} /> */}
            {/* <Route path="/loyalty-accounts" component={LoyaltyPage} /> */}
            {/* <Route path="/loyalty/:id" component={ManageLoyaltyPage} /> */}
            {/* <Route path="/loyalty" component={ManageLoyaltyPage} /> */}
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
