import React from 'react'

const CenterBar = ({ handleSearch, randomiseSmallSample, handleChange }) => {
  return (
  <div className='middlemiddlebox'>
    <div className='search'>
      <form onSubmit={handleSearch}>
      <input type='text submit' placeholder='search a subreddit...' onChange={handleChange} ></input>
      <button onClick={handleSearch} id='submit' type='submit'>.<span id='span-get' className='pulse'>get</span><span className='span-bracket'>(</span><span id='span-meme'>Memes</span><span className='span-bracket'>)</span></button>
      </form>
      <button onClick={randomiseSmallSample}>Randomise</button>
    </div>
  </div>
  )
}

export default CenterBar