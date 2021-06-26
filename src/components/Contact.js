import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div
      className="contact-segment"
      style={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <a href="https://github.com/loindes" target="_blank" rel="noreferrer">
          <i className="fab fa-github" />
        </a>
        &nbsp;
        <span>Moj GitHub repozitorij</span>
      </div>
      <div>
        <a href="mailto:iva.filipovic91@gmail.com">
          <i className="fas fa-envelope-square" />
        </a>
        &nbsp;
        <span>E-mail: iva.filipovic91@gmail.com</span>
      </div>
      <div>
        <a href="tel:+385914959132">
          <i className="fas fa-phone-square" />
        </a>
        &nbsp;
        <span>Telefon: 091/495-9132</span>
      </div>
      <br />
      <div>
        <button className="mt-lg-5 btn btn-dark">
          <Link to="/" className="text-light text-decoration-none">
            Početna
          </Link>
        </button>
        &nbsp;
        <button className="mt-lg-5 btn btn-dark">
          <Link to="/chat-app" className="text-light text-decoration-none">
            Chat APP
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Contact;
