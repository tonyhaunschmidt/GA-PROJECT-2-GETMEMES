import React, { useState, useEffect } from 'react'
import axios from 'axios'
//bootstrap
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'



const Hometwo = () => {

  const smallMemeSampleSize = 25
  const minimumMemeSampleSize = 1
  const [ memeSample, setMemeSample ] = useState([])
  const [ smallMemeSample, setSmallMemeSample ] = useState([])
  const [ searchBarText, setSearchBarText ] = useState('')

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

  return (
    <>
      <form onSubmit={handleSearch}>
      <input type='text' placeholder='search a subreddit...' onChange={handleChange} ></input>
      <input type='submit' value='go'></input>
      </form>
      <button onClick={randomiseSmallSample}>Randomise</button>
      <Container className="mt-4">
        <Row>
          {smallMemeSample.map((meme, idx) => 
            <Col key={idx} md="6" lg="4" className='mb-4'> {/* if we use the unique function above  change the key to the meme.url */}
                <Card style={{ width: '16rem' }}>
                  <Card.Img variant="danger" src={meme.preview[1]} /> 
                  <Card.Body>
                    <Card.Title>{meme.title}</Card.Title>
                  </Card.Body>
                </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  )
}

export default Hometwo