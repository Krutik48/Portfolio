import React from 'react'
import profileImg from '../Project-img/krutik_final.jpg'
import './home.css'
import { Row, Col, Container } from 'react-bootstrap'

export default function Home() {


  return (
    <div id="home" className="d-flex align-items-center home">
      <Container>
        <Row className="flex-wrap">
          <Col sm={6}>
            <img src={profileImg} alt="/" className="img-fluid profile p-3" />
          </Col>
          <Col sm={6} className="d-flex  justify-content-center flex-column ">
            <h1 className="my-3 intro">Hi, I'm Krutik Malani</h1>
            <h5 className="intro2">Web Development | Android Development</h5>
            <h5 className="intro3">IIT Madras'24</h5>
            <a href="#contact">
              <button className="btn btn-secondary me-auto px-4 my-3 intro4">Contact</button>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
