import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section>
      <h2>Welcome to .<Link to='/'><span id='span-get' className='pulse'>get</span><span className='span-bracket'>(</span><span id='span-meme'>Memes</span><span className='span-bracket'>)</span></Link></h2>
      <p>A 2 day project built with react!</p>
      <p>Created by Tom Murphy and Tony Haunschmidt</p>
      <p>This website pulls from a third party Meme API created by Dev Daksan - <Link to={'../https://github.com/D3vd/Meme_Api'}>https://github.com/D3vd/Meme_Api</Link></p>
      <p>The homepage randomly display 10 memes from many different subreddits. The user can search for a specific subreddit.</p>
      <p>Also the user can click on a meme to see it fullsize on our Meme page. This page also shows other memes from the selected meme's subreddit.</p>
    </section>
  )
}

export default About