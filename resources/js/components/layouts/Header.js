import React, { useState } from "react";
import { Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import  '../asset/style.css';


const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="nav">
     <Container>
     <Link to="/tasks">
        <Navbar.Brand>Task Manager</Navbar.Brand>
        </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
        <Link to="/tasks" className="header-nav-link">
            <Nav.Item>Tasks</Nav.Item>
        </Link>
        <Link to="/" className="header-nav-link">
            <Nav.Item className="ml-4">Add Task</Nav.Item>
        </Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
  </Navbar>
  );
};

export default Header;
