
import './App.css'
import { Route, Routes,Link } from 'react-router-dom'
import About from './Components/About'
import Home from './Components/Home'
import Projects from './Components/Projects'
import Skills from './Components/Skills'
import Contact from './Components/Contact'
function App() {

  return (
    <>
    <div className='nav-div'>
      <h1>MAHAVARSHNI S</h1>
    <nav className='nav-bar'>
      <Link to="/">Home</Link>
      <Link to="/About">About</Link>
       <Link to="/Projects">Projects</Link>
        <Link to="/Skills">Skills</Link>
         <Link to="/contact">Contact</Link>
    </nav>
    </div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/About" element={<About/>}></Route>
        <Route path="/Projects" element={<Projects />}></Route>
        <Route path="/Skills" element={<Skills/>}></Route>
        <Route path="/Contact" element={<Contact/>}></Route>
      </Routes>
    </>
  )
}

export default App;
