import React, { useEffect, useState } from 'react' 
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'

//bootstrap
import Card from 'react-bootstrap/Card'


const MemePage = () => {

  const subReddits = ['memes', 'dankememes', 'fellowkids', 'meme', 'animemes', 'dndmemes', 'lotrmemes', 'prequelmemes', 'historymemes', 'raimimemes', 'donaldtrumpmemes']


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
      <Link to='/'><p>.get(Memes)</p></Link>
      <Link to={'/meme'} state={{ ...randomisedMeme }}><p>Randomise</p></Link>
      { relatedMemesSample.length ?
        <>
          <div className='mainmemecontainer'>
            <Card>
              <Card.Img src={clickedOnMeme.preview[1]} />
              <Card.Body className='title'>
                <Card.Title>{clickedOnMeme.title}</Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className='memecontainer'>
            {relatedMemesSample.map((meme, index) =>
              <Card key={index}>
                <Link to={'/meme'} state={{ ...meme }}>
                  <Card.Img src={meme.preview[1]} />
                  <Card.Body className='title'>
                    <Card.Title>{meme.title}</Card.Title>
                  </Card.Body>
                </Link>
              </Card>
            )}
          </div>
        </>
        :
        <p>error</p>
      }
    </section>
    
  )

}

export default MemePage 