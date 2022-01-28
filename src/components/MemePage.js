import React, { useEffect, useState } from 'react' 
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'

import Spinner from '../utilities/Spinner'

//bootstrap
import Card from 'react-bootstrap/Card'


const MemePage = () => {

  const subReddits = ['memes', 'dankememes', 'fellowkids', 'meme', 'animemes', 'dndmemes',
  'lotrmemes', 'prequelmemes', 'historymemes', 'raimimemes', 'donaldtrumpmemes', 
  'gamingmemes', 'causaluk', 'memes_of_the_dank', 'memesirl']


  const location = useLocation()
  const clickedOnMeme = location.state
  const [ randomisedMeme, setRandomisedMeme ] = useState({})
  

  const relatedMemesSampleSize = 10
  const [ relatedMemesSample, setRelatedMemesSample ] = useState([])

  useEffect(() =>{
    const getRelatedMemes = async() => {
      try {
        const { data } = await axios.get(`https://meme-api.herokuapp.com/gimme/${clickedOnMeme.subreddit}/${relatedMemesSampleSize}`)
        setRelatedMemesSample(data.memes)
        const randomSubReddit = subReddits[Math.floor(Math.random() * subReddits.length)]
        const randomMeme = await axios.get(`https://meme-api.herokuapp.com/gimme/${randomSubReddit}`)
        setRandomisedMeme(randomMeme)
      } catch (error) {
        console.log(error)
      }
    }
    getRelatedMemes()
  }, [location])


  const randomMeme = async (e) => {
    const randomSubReddit = subReddits[Math.floor(Math.random() * subReddits.length)]
    try {
      const { data } = await axios.get(`https://meme-api.herokuapp.com/gimme/${randomSubReddit}`)
      setRandomisedMeme(data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <section className='memepage'>
      <div className='top-buttons'>
      <Link to='/'><p>.<span id='span-get' className='pulse'>get</span><span className='span-bracket'>(</span><span id='span-meme'>Memes</span><span className='span-bracket'>)</span></p></Link>
      <Link to={'/meme'} state={{ ...randomisedMeme }}><p>Randomise</p></Link>
      </div>
      { relatedMemesSample.length ?
        <div className='meme-wrapper'>
          <div className='mainmemecontainer'>
            <Card>
              <Card.Img src={clickedOnMeme.preview[1]} />
              <Card.Body className='title'>
                <Card.Title>{clickedOnMeme.title}</Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className='memecontainer'>
            <div className='memecontainer-top'>
            <Card>
                <Link to={'/meme'} state={{ ...relatedMemesSample[0] }}>
                  <Card.Img src={relatedMemesSample[0].preview[1]} />
                </Link>
              </Card>
            <Card>
              <Link to={'/meme'} state={{ ...relatedMemesSample[1] }}>
                <Card.Img src={relatedMemesSample[1].preview[1]} />
              </Link>
            </Card>
            <Card>
                <Link to={'/meme'} state={{ ...relatedMemesSample[2] }}>
                  <Card.Img src={relatedMemesSample[2].preview[1]} />
                </Link>
              </Card>
            </div>
            <div className='memecontainer-bottom'>
              <Card>
                  <Link to={'/meme'} state={{ ...relatedMemesSample[3] }}>
                    <Card.Img src={relatedMemesSample[3].preview[1]} />
                  </Link>
                </Card>
              <Card>
                <Link to={'/meme'} state={{ ...relatedMemesSample[4] }}>
                  <Card.Img src={relatedMemesSample[4].preview[1]} />
                </Link>
              </Card>
              <Card>
                  <Link to={'/meme'} state={{ ...relatedMemesSample[5] }}>
                    <Card.Img src={relatedMemesSample[5].preview[1]} />
                  </Link>
                </Card>
              </div>
          </div>
        </div>
        :
        <Spinner />
      }
    </section>
    
  )

}

export default MemePage 