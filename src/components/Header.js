import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
  const root = document.documentElement;
  const lightTheme = "211,211,211";
  const darkTheme = "135,135,135";

  const randomRGBValue = (min, max) =>
    min + Math.floor(Math.random() * (max - min));

  const changeThemeRandomLighterColor = () => {
    const r = randomRGBValue(100, 200);
    const g = randomRGBValue(100, 200);
    const b = randomRGBValue(100, 200);

    changeTheme(`${r},${g},${b}`);
  };

  const changeTheme = (themeValue) => {
    localStorage.setItem("theme", themeValue);
    root.style.setProperty("--main-bg-color", themeValue);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="sticky-top "
      >
        <Navbar.Brand href="/about-me" className="px-3 brand-font">
          Iva Stolnik
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav margin" />
        <Navbar.Collapse id="responsive-navbar-nav position-relative">
          <div className="nav-dropdown-custom-style bg-dark">
            <Nav className="mr-auto">
              <Nav.Link href="/">
                <i className="fas fa-home"></i>
              </Nav.Link>
              <Nav.Link href="/chat-app">Chat APP</Nav.Link>
              <NavDropdown title="Tema" id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={() => changeTheme(lightTheme)}>
                  Light
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeTheme(darkTheme)}>
                  Dark
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => changeThemeRandomLighterColor()}
                >
                  Random
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => changeTheme(lightTheme)}>
                  Resetiraj temu
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/contact">Kontakt</Nav.Link>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
