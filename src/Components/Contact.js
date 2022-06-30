import React from 'react'
import { Row, Col } from 'react-bootstrap'


export default function Contact() {
  return (
    <div className="d-flex flex-column justify-content-center container contact" style={{height:"100vh"}} >
      <h1>Contact</h1>
      <h5>Looking forward to hearing from you...</h5>

      <form >
        <Row>
          <Col sm={3}>
            <label for="firstName" className="form-label">First name*</label>
            <input type="text" className="form-control p-2" id="firsName" required />
          </Col>
          <Col sm={3}>
            <label for="lastName" className="form-label">Last name</label>
            <input type="text" className="form-control p-2" id="lastName" />
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <label for="Email" className="form-label">Email address</label>
            <input type="email" className="form-control p-2" id="Email" />
          </Col>
          <Col sm={3}>
            <label for="subject" className="form-label">Subject</label>
            <input type="text" className="form-control p-2" id="subject" />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <label for="message" class="form-label">Your message</label>
            <textarea class="form-control" id="message" rows="3"></textarea>
          </Col>
        </Row>
        <button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>

    </div>
  )
}
