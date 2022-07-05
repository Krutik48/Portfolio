import React from 'react'
import {Card,Button} from 'react-bootstrap'
import './portfolio.css'

export default function Portfolio(prop) {
    return (
        <div className="mx-5 my-4 ">
            <Card style={{ width: '22rem'}} className="port-card">
                <Card.Img variant="top" src={prop.imgUrl} style = {{height:`${prop.height}px`}} className="bo-ra" />
                <Card.Body>
                    <Card.Title>{prop.title}</Card.Title>
                    <Card.Text>{prop.desc}</Card.Text>
                    <a href={prop.link1} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary">DEMO</Button> 
                    </a>
                    <a href={prop.link2} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" className="mx-2">CODE</Button>
                    </a>
                </Card.Body>
            </Card>
        </div>
    )
}
