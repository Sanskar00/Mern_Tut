import React, { Fragment, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/layout/navbar";
import Landing from "./component/layout/Landing";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Alert from "./component/layout/Alert";
import "./App.css";
import Dashboard from "./component/dashboard/Dashboard";
import PrivateRoute from "./routing/PrivateRoute";
//Redux
import { Provider } from "react-redux";
import Profiles from "./component/profiles/Profiles";
import Profile from "./component/profile/Profile";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import CreateProfile from "./component/profile-form/CreateProfile";
import EditProfile from "./component/profile-form/EditProfile";
import AddExperiece from "./component/profile-form/AddExperiece";
import AddEducation from "./component/profile-form/AddEducation";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/create-profile" component={CreateProfile} />
              <PrivateRoute path="/edit-profile" component={EditProfile} />
              <PrivateRoute path="/add-experience" component={AddExperiece} />
              <PrivateRoute path="/add-education" component={AddEducation} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
