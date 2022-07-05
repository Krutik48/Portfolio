import {Container,Nav, NavDropdown } from 'react-bootstrap'
import Navbar2 from 'react-bootstrap/Navbar' 

import React from 'react'
import './Navbar.css'

export default function Navbar() {
  return (
    <div>
      <Navbar2 collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-top nav2"  >
          <Navbar2.Brand href="#home" className="mx-3 brand-name">Krutik</Navbar2.Brand>
          <Navbar2.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar2.Collapse id="responsive-navbar-nav">
           
            <Nav className="ms-auto me-3">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="https://drive.google.com/file/d/10rm-Ft-gRdgMi2urkm50y1zvDmopbt7E/view?usp=sharing" target="_blank">Resume</Nav.Link>
              <Nav.Link href="#portfolio">Portfolio</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar2.Collapse>
      </Navbar2>
    </div>
  )
}
