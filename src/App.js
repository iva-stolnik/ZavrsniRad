import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "./redux/actions";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import ChatAPP from "./containers/Chat";
import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";
import PageDoesNotExist from "./components/PageDoesNotExist";
import Footer from "./components/Footer";
import "./App.css";

function App({ member, loginUser }) {
  window.addEventListener("load", () => {
    const root = document.documentElement;
    root.style.setProperty("--main-bg-color", localStorage.getItem("theme"));

    if (localStorage.myUser) {
      loginUser(localStorage.getItem("myUser"));
    }
  });

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/chat-app">
          {member ? (
            <ChatAPP />
          ) : (
            //if state.member has no value redirect to /login
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
        <Route path="/login">
          {member ? (
            //if state.member has value redirect to /chat-app
            <Redirect to={{ pathname: "/chat-app" }} />
          ) : (
            <Login />
          )}
        </Route>
        <Route path="/about-me" component={AboutMe} />
        <Route path="/contact" component={Contact} />
        <Route path="*" component={PageDoesNotExist} />
      </Switch>
      <Footer />
    </div>
  );
}

ChatAPP.propTypes = {
  member: PropTypes.string,
  loginUser: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    member: state.member,
  };
}

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
