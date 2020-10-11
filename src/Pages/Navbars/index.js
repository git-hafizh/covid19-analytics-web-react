import React from "react";
import {
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Navbar,
} from "reactstrap";

export default function Navbars(){

  const [open, setOpen] = React.useState(false);

  const toggle = () => setOpen(!open)

  return (
    <div id="navbars">
      <Navbar style={{background: "#F7FAFC"}} light expand="md">
        <NavbarBrand href="/">COVID-19 Tracker Web</NavbarBrand>
        {/* <NavbarToggler onClick={toggle} />
          <Collapse navbar isOpen={open}>
              <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/">Tentang</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/">Gejala</NavLink>
                  </NavItem>
              </Nav>
          </Collapse> */}
      </Navbar>
    </div>
  );
}

