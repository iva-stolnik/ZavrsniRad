import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="window-height homepage-bg">
      <div className="title">
        <h1>Dobrodošli u Web chat APP</h1>
        <em>Powered by Algebra.&nbsp;</em>
      </div>
      <h5 className="homapage-link-info">Uđi u chat sobu</h5>
      <Link className="homapage-link" to="/chat-app"></Link>
    </div>
  );
};

export default Homepage;
