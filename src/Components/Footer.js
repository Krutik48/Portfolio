import React from 'react'
import './footer.css'
import {Row,Col} from 'react-bootstrap'
import linkdin from '../Project-img/linkedin.png'

export default function Footer() {
    return (
        <div>
            <footer className="bd-footer p-4 mt-5 bg-dark">
                <div className="d-flex justify-content-center container">
                    <Col>
                        <Row>
                            <h4>Phone</h4>
                        </Row>
                        <Row>
                            <h6><a href="https://wa.link/ac0bsn" target="_blank" rel="noopener noreferrer">+91 74330 86205</a></h6>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <h4>Email</h4>
                        </Row>
                        
                        <Row>
                            <h6><a href="mailto:krutikmalani480@gmail.com" target="_blank" rel="noopener noreferrer">krutikmalani480@gmail.com</a></h6>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <h4>Follow me</h4>
                        </Row>
                        <Row>
                            <Col>
                                <a href="https://twitter.com/">
                                    <img src={linkdin} alt="" style={{width:"30px"}}/>
                                </a>
                            </Col>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <h4>&copy; 2022 By Krutik Malani</h4>
                        </Row>
                    </Col>
                </div>
            </footer>
        </div>
    )
}
