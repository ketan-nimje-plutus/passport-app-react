import React from "react";
import Sidebar from "../src/component/sidebar/sidebar";
import "./App.css";
import "../src/assets/css/style.scss";
import "../src/assets/css/media.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { StoreOwnerRoutes } from "./routes/storeowner.route";
import StoreHeader from "./component/header/header"

const DefaultRoutes = (props) => {
  if ((Cookies.get("loggedIn") === undefined) && (props.auth)) {
    return <Redirect to="/" />;
  }

  if (props.defaultRoutes) {
    return (
      <div className="page-wrapper">
        <div className="d-flex">
          <Sidebar sideBar={props.sideBarActive} onClick={props.sidebarToggle} />
          <div className="section-wrapper">
            <StoreHeader onClick={props.sidebarToggle} />
            <props.component />
          </div>
        </div>
      </div>
    );
  } else {
    return <props.component />;
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarActive: false,
    }
  }
  sidebarToggle = () => {
    // console.log("sidebarToggle", this.state.sideBarActive)
    this.setState({ sideBarActive: !this.state.sideBarActive });
  }

  render() {
    return (
      <Router>
        <div className="full-width-wrapper">
          <Switch>
            {StoreOwnerRoutes.map((route, index) => {
              if (route.path === "/") {
                if (Cookies.get("loggedIn") === undefined) {
                  return (
                    <Route key={index} exact={route.exact} path={route.path}>
                      <route.component />
                    </Route>
                  );
                } else {
                  return <Redirect to="/dashboard" key={index} />;
                }
              } else {
                return (
                  <Route key={index} exact={route.exact} path={route.path}>
                    <DefaultRoutes
                      component={route.component}
                      defaultRoutes={route.defaultRoutes}
                      auth={route.auth}
                      sideBarActive={this.state.sideBarActive}
                      sidebarToggle={() => this.sidebarToggle()}
                    />
                  </Route>
                );
              }
            })}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
