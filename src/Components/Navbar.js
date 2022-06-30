import {Container,Nav, NavDropdown } from 'react-bootstrap'
import Navbar2 from 'react-bootstrap/Navbar' 

import React from 'react'
export default function Navbar() {
  return (
    <div>
      <Navbar2 collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar2.Brand href="#home" className="mx-3">Krutik</Navbar2.Brand>
          <Navbar2.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar2.Collapse id="responsive-navbar-nav">
           
            <Nav className="ms-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Resume</Nav.Link>
              <Nav.Link href="#">Portfolio</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>
          </Navbar2.Collapse>
      </Navbar2>
    </div>
  )
}
