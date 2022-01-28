import React, { useEffect, useState } from 'react' 
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'

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
      <Link to='/'><p>.get(Memes)</p></Link>
      <button onClick={randomMeme()}>Randomise</button>
      { relatedMemesSample.length ?
        <>
          <div className='mainmemecontainer'>
            <Card>
              <Card.Img src={currentMeme.preview[1]} />
              <Card.Body className='title'>
                <Card.Title>{currentMeme.title}</Card.Title>
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