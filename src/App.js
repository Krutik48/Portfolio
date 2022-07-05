import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Portfolios from './Components/Portfolios'
import Contact from './Components/Contact'
import Footer from './Components/Footer'
import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar className="navbar" />
      <Home className="home" />
      <Portfolios className="portfolio"/>
      <Contact className="contact" />
      <Footer className="footer"/>
    </div>
  );
}

export default App;
