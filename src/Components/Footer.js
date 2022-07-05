import React from 'react'
import './footer.css'
import { Row, Col } from 'react-bootstrap'
import linkdin from '../Project-img/linkedin.png'
import instagram from '../Project-img/instagram.png'
import twitter from '../Project-img/twitter.png'
import facebook from '../Project-img/facebook.png'
import github from '../Project-img/github.png'

export default function Footer() {
    return (
        <div>
            <footer className="bd-footer p-4 mt-5 bg-dark">
                <Row>
                    <Col sm={3} className="my-2">
                        <Row>
                            <h4>Phone</h4>
                        </Row>
                        <Row>
                            <h6><a href="https://wa.link/ac0bsn" target="_blank" rel="noopener noreferrer">+91 74330 86205</a></h6>
                        </Row>
                    </Col>
                    <Col sm={3} className="my-2">
                        <Row>
                            <h4>Email</h4>
                        </Row>

                        <Row>
                            <h6><a href="mailto:krutikmalani480@gmail.com" target="_blank" rel="noopener noreferrer">krutikmalani480@gmail.com</a></h6>
                        </Row>
                    </Col>
                    <Col sm={3} className="my-2">
                        <Row >
                            <h4>Follow me</h4>
                        </Row>
                        <Row xs="auto">
                            <Col className="icn">
                                <a href="www.linkedin.com/in/krutik-malani-71731b1ab">
                                    <img src={linkdin} alt="" style={{ width: "30px" }} />
                                </a>
                            </Col>
                            <Col className="icn">
                                <a href="https://twitter.com/Krutik48?t=qgdttNcXILlHNHI-BDVmGA&s=08">
                                    <img src={twitter} alt="" style={{ width: "30px" }} />
                                </a>
                            </Col>
                            <Col className="icn">
                                <a href="http://instagram.com/krutik_malani?utm_source=qr">
                                    <img src={instagram} alt="" style={{ width: "30px" }} />
                                </a>
                            </Col>
                            <Col className="icn">
                                <a href="https://github.com/Krutik48">
                                    <img src={github} alt="" style={{ width: "30px" }} />
                                </a>
                            </Col>
                            <Col className="icn">
                                <a href="https://www.facebook.com/krutik.malani.3">
                                    <img src={facebook} alt="" style={{ width: "30px" }} />
                                </a>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={3} className="my-2">
                        <Row>
                            <h4>&copy; 2022 By Krutik Malani</h4>
                        </Row>
                    </Col>
                </Row>
            </footer>
        </div>
    )
}
