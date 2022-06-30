import React from 'react'
import Portfolio from './Portfolio'
import portfolio from "../Project-img/portfolio.png";
import musicplayer from "../Project-img/musicplayer.jpeg";
import simongame from "../Project-img/simongame.png";
import weatherapp from "../Project-img/weatherapp.png";
import analogclock from "../Project-img/analogclock.png";
import amongdinogame from "../Project-img/amongdinogame.png";
import newsapp from "../Project-img/newsapp.jpeg";
import paintapp from "../Project-img/paintapp.jpeg";
import currencyconverter from "../Project-img/currencyconverter.jpeg";
import sciencewebapi from "../Project-img/sciencewebapi.webp";
import mapsmapapi from "../Project-img/mapsmapapi.jpg";
import {Container} from 'react-bootstrap'

export default function Portfolios() {

  const project1 = [
    {
      id: 1,
      title: "My Portfolio",
      src: portfolio,
      desc:"",
    },
    
    {
      id: 3,
      title: "Mapsmap API",
      src: mapsmapapi,
      desc:"",
    },
    {
      id: 4,
      title:"Scienceweb API",
      src: sciencewebapi,
      desc:"",
    },
    {
      id: 5,
      title: "Simon Game",
      src: simongame,
      desc:"",
    },
    {
      id: 6,
      title: "Among-dino Game",
      src: amongdinogame,
      desc:"",
    },
    {
      id: 7,
      title: "Weather App",
      src: weatherapp,
      desc:"",
    },
    {
      id: 8,
      title: "Analog Clock",
      src: analogclock,
      desc:"",
    },
    
  ]

  const project2 = [
    {
      id: 2,
      title: "Music Player",
      src: musicplayer,
      desc:"",
    },
    {
      id: 9,
      title: "News App",
      src: newsapp,
      desc:"",
    },
    {
      id: 10,
      title: "Paint App",
      src: paintapp,
      desc:"",
    },
    {
      id:11,
      title: "$ to Rs Converter",
      src: currencyconverter,
      desc:"",
    }

  ]
  
  return (
    <div>
      <h1>Portfolio</h1>
      <h3>Web Development Projects</h3>
     
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-baseline ">
        {project1.map((project) => {
          return <Portfolio key={project.id} height={200} title={project.title} desc={project.desc} imgUrl={project.src}/>
        })}
      </div>

      <h3>Android Development Projects</h3>
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-baseline ">
        {project2.map((project) => {
          return <Portfolio key={project.id} height={500}title={project.title} desc={project.desc} imgUrl={project.src}/>
        })}
      </div>
    </div>
  )
}
