import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute.component";
import PublicRoute from "./components/PublicRoute.component";
import BlogPage from "./pages/Blog.page";
import CreatePasswordPage from "./pages/CreatePassword";
import ForgotPasswordPage from "./pages/ForgotPassword.page";
import GroupsPage from "./pages/Groups.page";
import LoginPage from "./pages/Login.page";
import OtpValidation from "./pages/OtpValidation.page";
import OverviewPage from "./pages/Overview.page";
import AdminPage from "./pages/Admin.page";
import SuggestionsPage from "./pages/Suggestions.page";
import UsersPage from "./pages/Users.page";
import BlogList from "./pages/BlogList.page";
import Error404Page from "./pages/404Error.page";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <OverviewPage />
        </PrivateRoute>
        <PrivateRoute path="/users">
          <UsersPage />
        </PrivateRoute>
        <PrivateRoute path="/groups">
          <GroupsPage />
        </PrivateRoute>
        <PrivateRoute path="/suggestions">
          <SuggestionsPage />
        </PrivateRoute>
        <PrivateRoute path="/blog">
          <BlogList />
        </PrivateRoute>
        <PrivateRoute path="/add-blog">
          <BlogPage />
        </PrivateRoute>
        <PrivateRoute path="/admin">
          <AdminPage />
        </PrivateRoute>
        <PublicRoute path="/login">
          <LoginPage />
        </PublicRoute>
        <PublicRoute path="/forgot-password">
          <ForgotPasswordPage />
        </PublicRoute>
        <Route path="/validate-otp">
          <OtpValidation />
        </Route>
        <Route path="/create-password">
          <CreatePasswordPage />
        </Route>
        <Route path="*">
          <Error404Page />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
