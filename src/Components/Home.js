import React from 'react'
import profileImg from '../Project-img/krutik_final.jpg'
import './home.css'
import {Row,Col,Container} from 'react-bootstrap'

export default function Home() {
  return (
    <div className="d-flex align-items-center home">
        <Container>
          <Row>
            <Col>
              <img src={profileImg} alt="/" className="img-fluid img-thumbnail profile"/>
            </Col>
            <Col className="d-flex  justify-content-center flex-column ">
              <h1 className="my-3">Hi, I'm Krutik Malani</h1>
              <h5>Web Development | Android Development</h5>
              <h5>IIT Madras'24</h5>
              <button className="btn btn-secondary me-auto px-4 my-3">Contact</button>
            </Col>
          </Row>
        </Container>
    </div>
  )
}
