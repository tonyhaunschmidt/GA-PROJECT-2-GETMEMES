import React, { useState, useEffect } from 'react'
import axios from 'axios'

//Components
import { Link } from 'react-router-dom'

//bootstrap
import Card from 'react-bootstrap/Card'
import CenterBar from './CenterBar'



const Home = () => {

  const smallMemeSampleSize = 8
  const minimumMemeSampleSize = 1
  const [ memeSample, setMemeSample ] = useState([])
  const [ smallMemeSample, setSmallMemeSample ] = useState([])
  const [ searchBarText, setSearchBarText ] = useState('')
  const [ currentStoredMeme, setCurrentStoredMeme ] = useState({})

  const subReddits = ['memes', 'dankememes', 'fellowkids', 'meme', 'animemes', 'dndmemes', 'lotrmemes', 'prequelmemes', 'historymemes', 'raimimemes', 'donaldtrumpmemes']



  useEffect(() => {
    const getMemes = async() => {
      try {
        let memeSampleToAdd = []
        for (let i = 0; i < subReddits.length; i++){
          const { data } = await axios.get(`https://meme-api.herokuapp.com/gimme/${subReddits[i]}/50`)
          for (let i = 0; i < data.memes.length; i++){
            memeSampleToAdd.push(data.memes[i])
          }
        }
        setMemeSample(memeSampleToAdd)
        const smallMemeSampleToAdd = []
        for (let i = 0; i < smallMemeSampleSize; i++){
          smallMemeSampleToAdd.push(memeSampleToAdd[Math.floor(Math.random() * memeSampleToAdd.length)])
        }
        setSmallMemeSample(smallMemeSampleToAdd)
      } catch (err) {
        console.log(err)
      }
    }  
    getMemes()
  }, [])


  const randomiseSmallSample = () => {
    const smallMemeSampleToAdd = []
        for (let i = 0; i < smallMemeSampleSize; i++){
          smallMemeSampleToAdd.push(memeSample[Math.floor(Math.random() * memeSample.length)])
        }
        setSmallMemeSample(smallMemeSampleToAdd)
  }


  const handleChange = (e) => {
    setSearchBarText(e.target.value)
  }


  const handleSearch = async(e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get(`https://meme-api.herokuapp.com/gimme/${searchBarText.replace(/\s/g, '')}/${smallMemeSampleSize}`)
      setSmallMemeSample(data.memes)
    } catch {
      console.log('subreddit does not exsist- here are some memes we think you would like')
      let searchAttemptLayer2 = []
      if (searchBarText !== ''){
        for (let i = 0; i < memeSample.length; i++){
          if(memeSample[i].title.toLowerCase().includes(searchBarText.toLowerCase())){
            searchAttemptLayer2.push(memeSample[i])
          }
        }
        if(searchAttemptLayer2.length < minimumMemeSampleSize){
          console.log('search not found big enough sample')
        } else {
          setSmallMemeSample(searchAttemptLayer2.slice(0, smallMemeSampleSize))
        }
      } else {
        console.log('nothing searched for')
      }
    }
  }

  const retrieveID = (meme) => {
    return meme.postLink.split('/')[3]
  }


  const storeMeme = (meme) => {
    setCurrentStoredMeme({ ...meme })
    console.log(currentStoredMeme)
  }


  return (
  <main>
    {smallMemeSample.length ?
      <>
      <div className='leftbox'>
        <Card>
          <Link to={'/meme'} state={{ ...smallMemeSample[0] }}>
            <Card.Img src={smallMemeSample[0].preview[1]} />
            <Card.Body className='title'>
              <Card.Title>{smallMemeSample[0].title}</Card.Title>
            </Card.Body>
          </Link>
        </Card>
      </div>
      <div className='middlebox'>
        <div className='middletopbox'>
          <Card>
            <Link to={'/meme'} state={{ ...smallMemeSample[1] }}>
              <Card.Img src={smallMemeSample[1].preview[1]} /> 
              <Card.Body className='title'>
                <Card.Title>{smallMemeSample[1].title}</Card.Title>
              </Card.Body>
            </Link>
          </Card>
          <Card>
            <Link to={'/meme'} state={{ ...smallMemeSample[2] }}>
              <Card.Img src={smallMemeSample[2].preview[1]} />  
              <Card.Body className='title'>
                <Card.Title>{smallMemeSample[2].title}</Card.Title>
              </Card.Body>
            </Link>
          </Card>
          <Card>
            <Link to={'/meme'} state={{ ...smallMemeSample[3] }}>
              <Card.Img src={smallMemeSample[3].preview[1]} /> 
              <Card.Body className='title'>
                <Card.Title>{smallMemeSample[3].title}</Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </div>
        <CenterBar handleSearch={handleSearch} randomiseSmallSample={randomiseSmallSample} handleChange={handleChange}  />
        <div className='middlebottombox'>
          <Card>
            <Link to={'/meme'} state={{ ...smallMemeSample[4] }}>
              <Card.Img src={smallMemeSample[4].preview[1]} /> 
              <Card.Body className='title'>
                <Card.Title>{smallMemeSample[4].title}</Card.Title>
              </Card.Body>
            </Link>
          </Card>
          <Card>
            <Link to={'/meme'} state={{ ...smallMemeSample[5] }}>
              <Card.Img src={smallMemeSample[5].preview[1]} /> 
              <Card.Body className='title'>
                <Card.Title>{smallMemeSample[5].title}</Card.Title>
              </Card.Body>
            </Link>
          </Card>
          <Card>
            <Link to={'/meme'} state={{ ...smallMemeSample[6] }}>
              <Card.Img src={smallMemeSample[6].preview[1]} /> 
              <Card.Body className='title'>
                <Card.Title>{smallMemeSample[6].title}</Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </div>
      </div>
      <div className='rightbox'>
        <Card>
          <Link to={'/meme'} state={{ ...smallMemeSample[7] }}>
            <Card.Img src={smallMemeSample[7].preview[1]} /> 
            <Card.Body className='title'>
              <Card.Title>{smallMemeSample[7].title}</Card.Title>
            </Card.Body>
          </Link>
        </Card>
      </div>
    </>
    :
    <p>loading..</p>
    }
    </main>
  )
}

export default Home