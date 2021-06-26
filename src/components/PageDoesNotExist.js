import React from "react";
import { Link } from "react-router-dom";

const PageDoesNotExist = () => {
  return (
    <div className="window-height error-page flex-column">
      <h1 className="col-6">404 - stranica ne postoji</h1>
      <button className="mt-lg-5 btn btn-dark">
        <Link to="/" className="text-light text-decoration-none">
          Početna
        </Link>
      </button>
    </div>
  );
};

export default PageDoesNotExist;
