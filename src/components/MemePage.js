import React from 'react' 
import { useLocation } from 'react-router-dom'


const MemePage = () => {

  const location = useLocation()
  const currentMeme = location.state

  console.log(currentMeme)

  return (
    <>
      <img src={currentMeme.preview[0]} alt={currentMeme.title}/>
    </>
    
  )

}

export default MemePage 