import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../redux/actions";

const Login = ({ loginUser }) => {
  const handleLogin = () => {
    let nickname = document.getElementById("login-value").value;

    //no empty values
    if (nickname.match(/^ *$/) !== null) return;
    localStorage.setItem("myUser", nickname);
    loginUser(nickname);
  };

  const handleKeyLogin = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className="window-height">
      <form className="form-inline">
        <div className="form-group mx-sm-3 mb-2">
          <input
            type="text"
            id="login-value"
            className="form-control"
            placeholder="Nadimak"
            autoFocus={true}
            onKeyDown={handleKeyLogin}
            maxLength="10"
          />
          <small className="form-text text-muted">
            Unesite nadimak kako biste ušli u chat sobu
          </small>
          <br />
        </div>
        <br />
        <button
          type="button"
          className="btn btn-primary mb-2"
          onClick={handleLogin}
        >
          Uđi
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    state,
  };
}

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
