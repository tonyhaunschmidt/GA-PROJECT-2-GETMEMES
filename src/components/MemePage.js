import React, { useEffect, useState } from 'react' 
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'

//bootstrap
import Card from 'react-bootstrap/Card'


const MemePage = () => {

  const location = useLocation()
  const currentMeme = location.state
  

  const relatedMemesSampleSize = 10
  const [ relatedMemesSample, setRelatedMemesSample ] = useState([])

  useEffect(() =>{
    const getMemes = async() => {
      try {
        console.log(currentMeme.subreddit)
        const { data } = await axios.get(`https://meme-api.herokuapp.com/gimme/${currentMeme.subreddit}/${relatedMemesSampleSize}`)
        setRelatedMemesSample(data.memes)
      } catch (error) {
        console.log(error)
      }
    }
    getMemes()
  }, [location])





  return (
    <section>
      { relatedMemesSample.length ?
        <>
          {console.log(relatedMemesSample)}
          <img src={currentMeme.preview[1]} alt={currentMeme.title}/>
          <div>
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