import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//COMPONENTS
import Home from './components/Home'
import MemePage from './components/MemePage'
import About from './components/About'




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='meme' element={<MemePage />}/>
        <Route path='about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
