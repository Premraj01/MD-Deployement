import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
// import { useUserState } from "../context/UserContext";

export default function App() {
  // global
  // var { isAuthenticated } = useUserState();
  // const [isAuthenticated, setIsAuth] = useState(false);
  // const adminLogin = useSelector((state) => state.adminLogin);
  // const { adminInfo } = adminLogin;
  // console.log(adminInfo);
  // if (adminInfo) {
  //   setIsAuth(true);
  // } else {
  //   setIsAuth(false);
  // }
  let admin = JSON.parse(localStorage.getItem("adminInfo"));
  let isAuthenticated;
  if (admin) {
    isAuthenticated = true;
    console.log("ss", isAuthenticated);
  } else {
    isAuthenticated = false;
  }
  // useEffect(() => {

  // }, [isAuthenticated]);

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
