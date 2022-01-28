import React, { useEffect, useState } from 'react' 
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'

import Spinner from '../utilities/Spinner'

//bootstrap
import Card from 'react-bootstrap/Card'


const MemePage = () => {

  const subReddits = ['memes', 'dankememes', 'fellowkids', 'meme', 'animemes', 'dndmemes', 'lotrmemes', 'prequelmemes', 'historymemes', 'raimimemes', 'donaldtrumpmemes']


  const location = useLocation()
  let currentMeme = location.state
  

  const relatedMemesSampleSize = 10
  const [ relatedMemesSample, setRelatedMemesSample ] = useState([])

  useEffect(() =>{
    
    const getMemes = async() => {
      try {
        const { data } = await axios.get(`https://meme-api.herokuapp.com/gimme/${currentMeme.subreddit}/${relatedMemesSampleSize}`)
        setRelatedMemesSample(data.memes)
      } catch (error) {
        console.log(error)
      }
    }
    getMemes()
  }, [location])



  const randomMeme = async (e) => {
  //  const randomSubReddit = subReddits[Math.floor(Math.random() * subReddits.length)]
  //  try {
  //    const { data } = await axios.get(`https://meme-api.herokuapp.com/gimme/${randomSubReddit}/1}`)
  //    setCurrentMeme(data.memes[0])
  //  } catch (error) {
  //    console.log(error)
  //  }
  }


  return (
    <section className='memepage'>
      {console.log(currentMeme)}
      <div className='top-buttons'>
      <Link to='/'><p>.<span id='span-get' className='pulse'>get</span><span className='span-bracket'>(</span><span id='span-meme'>Memes</span><span className='span-bracket'>)</span></p></Link>
      <button onClick={randomMeme()}>Randomise</button>
      </div>
      { relatedMemesSample.length ?
        <div className='meme-wrapper'>
          <div className='mainmemecontainer'>
            <Card>
              <Card.Img src={currentMeme.preview[1]} />
              <Card.Body className='title'>
                <Card.Title>{currentMeme.title}</Card.Title>
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