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
import { Container } from 'react-bootstrap'

export default function Portfolios() {

  const project1 = [
    {
      id: 1,
      title: "My Portfolio",
      src: portfolio,
      desc: "",
      link1: "https://github.com/Krutik48/Portfolio",
      link2: "https://krutik48.github.io/Portfolio/"
    },

    {
      id: 3,
      title: "Mapsmap API",
      src: mapsmapapi,
      desc: "",
      link1: "https://documenter.getpostman.com/view/18447699/UVsFxTBF",
      link2: "https://github.com/jayanth151002/Mapsmap-hackathon"
    },
    {
      id: 4,
      title: "Scienceweb API",
      src: sciencewebapi,
      desc: "",
      link1: "https://documenter.getpostman.com/view/14670440/UzBiNTy9",
      link2: "https://documenter.getpostman.com/view/14670440/UzBiNTy9"
    },
    {
      id: 5,
      title: "Simon Game",
      src: simongame,
      desc: "",
      link1: "https://krutik48.github.io/Simon-Game/",
      link2: "https://github.com/Krutik48/Simon-Game"
    },
    {
      id: 6,
      title: "Among-dino Game",
      src: amongdinogame,
      desc: "",
      link1: "https://krutik48.github.io/space-jumping-game/",
      link2: "https://github.com/Krutik48/space-jumping-game"
    },
    {
      id: 7,
      title: "Weather App",
      src: weatherapp,
      desc: "",
      link1: "https://krutik48.github.io/weather-app/",
      link2: "https://github.com/Krutik48/weather-app"
    },
    {
      id: 8,
      title: "Analog Clock",
      src: analogclock,
      desc: "",
      link1: "https://krutik48.github.io/Analog-Clock/",
      link2: "https://github.com/Krutik48/Analog-Clock"
    },

  ]

  const project2 = [
    {
      id: 2,
      title: "Music Player",
      src: musicplayer,
      desc: "",
      link1: "https://drive.google.com/drive/folders/1vPqR8Y02o9LwXse2t0IGHOBo_cUsozY4?usp=sharing",
      link2: "https://github.com/Krutik48/Music-Player"
    },
    {
      id: 9,
      title: "News App",
      src: newsapp,
      desc: "",
      link1: "https://drive.google.com/drive/folders/1-C0WV6KtGoT_OfHdlIoARgIx3zK-cbUH?usp=sharing",
      link2: "https://github.com/Krutik48/Portfolio"
    },
    {
      id: 10,
      title: "Paint App",
      src: paintapp,
      desc: "",
      link1: "https://drive.google.com/drive/folders/1-C0WV6KtGoT_OfHdlIoARgIx3zK-cbUH?usp=sharing",
      link2: "https://drive.google.com/drive/folders/1-C0WV6KtGoT_OfHdlIoARgIx3zK-cbUH?usp=sharing"
    },
    {
      id: 11,
      title: "$ to Rs Converter",
      src: currencyconverter,
      desc: "",
      link1: "https://drive.google.com/drive/folders/1kr-greFLdIf-R5N6K89JA5CBHe10mqSm?usp=sharing",
      link2: "https://drive.google.com/drive/folders/1kr-greFLdIf-R5N6K89JA5CBHe10mqSm?usp=sharing"
    }

  ]

  return (
    <div id="portfolio">
      <h1>Portfolio</h1>
      <h3>Web Development Projects</h3>

      <div className="d-flex flex-row flex-wrap justify-content-center align-items-baseline ">
        {project1.map((project) => {
          return <Portfolio key={project.id} height={170} title={project.title} desc={project.desc} imgUrl={project.src} link1={project.link1} link2={project.link2} />
        })}
      </div>

      <h3>Android Development Projects</h3>
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-baseline ">
        {project2.map((project) => {
          return <Portfolio key={project.id} height={500} title={project.title} desc={project.desc} imgUrl={project.src} link1={project.link1} link2={project.link2} />
        })}
      </div>
    </div>
  )
}
