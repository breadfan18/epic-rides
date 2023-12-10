import React, { useEffect, useState, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import Header from "./common/Header";
import DataPage from "./data/DataPage";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./login/Login";
import { Spinner } from "./common/Spinner";
import { useSigninCheck } from "reactfire";
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
        <img
          src="https://i.imgur.com/DKkCN78.png"
          alt=""
          style={{ width: "100vw", height: "40vh", marginBottom: "15px" }}
        />
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/tours" component={DataPage} />
            {/* <Route path="/tour/:id" component={CardDetailsPage} /> */}
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
