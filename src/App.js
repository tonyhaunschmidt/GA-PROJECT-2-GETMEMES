import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//COMPONENTS
import Home from './components/Home'
import MemePage from './components/MemePage'




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='meme' element={<MemePage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
