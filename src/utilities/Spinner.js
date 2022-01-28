import React from 'react'
import spinnerImg from '../images/spinner.gif'

const Spinner = () => (
  <div className="spinner-wrapper">
    <p className='loading'><span id='span-get' className='pulse'>getting</span><span className='span-bracket'>(</span><span id='span-meme'>Memes</span><span className='span-bracket'>)</span></p>
    <img src={spinnerImg} alt="" className="spinner" />
  </div>
)

export default Spinner