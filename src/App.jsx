import './App.css'
import { Route, Routes } from 'react-router-dom'
import {useState} from 'react'
import About from './Components/About'
import Projects from './Components/Projects'
import Skills from './Components/Skills'
import Contact from './Components/Contact'
import Login from './Components/Login'
import Layout from './Components/Layout'
import Dashboard from './Components/Dashboard'
import Portfolio from './Components/Portfolio'
import Register from './Components/Register'

function App() {
  return (
    <>
      <Routes>
        {/* Public routes without navbar */}
        <Route path="/" element={<Login/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register/>}></Route>
        
        {/* Dashboard route - standalone without navbar */}
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        
        {/* Portfolio routes with navbar */}
        <Route path="/portfolio" element={<Layout><Portfolio/></Layout>}></Route>
        <Route path="/About" element={<Layout><About/></Layout>}></Route>
        <Route path="/Projects" element={<Layout><Projects /></Layout>}></Route>
        <Route path="/Skills" element={<Layout><Skills/></Layout>}></Route>
        <Route path="/Contact" element={<Layout><Contact /></Layout>}></Route>
      </Routes>
    </>
  )
}

export default App;
