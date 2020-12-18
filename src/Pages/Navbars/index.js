import React from "react";
import {
  NavbarBrand,
  Navbar,
} from "reactstrap";

export default function Navbars(){
  return (
    <div id="navbars">
      <Navbar style={{background: "#F7FAFC"}} light expand="md">
        <NavbarBrand href="/">COVID-19 Tracker Web</NavbarBrand>
      </Navbar>
    </div>
  );
}

