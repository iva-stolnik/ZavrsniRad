import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userLogout } from "../redux/actions";

const Logout = ({ userLogout }) => {
  const logOut = () => {
    userLogout(localStorage.getItem("myUserID"));
  };
  return (
    <>
      <button className="logout-button" onClick={() => logOut()}>
        <i className="fas fa-power-off"></i>
      </button>
    </>
  );
};

Logout.propTypes = {
  userLogout: PropTypes.func,
};

const mapDispatchToProps = {
  userLogout,
};
function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
