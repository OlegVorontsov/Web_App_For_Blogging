import React from 'react';
import AllNavs from './components/AllNavs';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Navbar } from 'react-bootstrap';

const NavigationMenu = () => {
  return (
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">BlogApp</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <AllNavs />
  </Navbar.Collapse>
</Navbar>
  );
};

export default NavigationMenu;