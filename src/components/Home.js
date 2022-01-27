import React, { useState, useEffect } from 'react'
import axios from 'axios'
//bootstrap
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'



const Home = () => {

  const smallMemeSampleSize = 25
  const [ memeSample, setMemeSample ] = useState([])
  const [ searchedMemes, setSearchedMemes ] = useState([])
  const [ smallMemeSample, setSmallMemeSample ] = useState([])

  const subReddits = ['memes', 'dankememes', 'fellowkids', 'meme', 'animemes', 'dndmemes', 'lotrmemes', 'prequelmemes', 'historymemes', 'raimimemes']



  useEffect(() => {
    const getMemes = async() => {
      try {
        //let memeSampleToAdd = []

        //for (let i = 0; i < subReddits.length; i++){
        //  const partSample = await axios.get(`https://meme-api.herokuapp.com/gimme/${subReddits[i]}/50`)
        //  memeSampleToAdd = [...memeSampleToAdd, partSample.data.memes]
        //}
        
        const partSampleOne = await axios.get(`https://meme-api.herokuapp.com/gimme/${subReddits[0]}/50`)
        const partSampleTwo = await axios.get(`https://meme-api.herokuapp.com/gimme/${subReddits[1]}/50`)
        const partSampleThree = await axios.get(`https://meme-api.herokuapp.com/gimme/${subReddits[2]}/50`)
        const partSampleFour = await axios.get(`https://meme-api.herokuapp.com/gimme/${subReddits[3]}/50`)
        const partSampleFive = await axios.get(`https://meme-api.herokuapp.com/gimme/${subReddits[4]}/50`)
        const partSampleSix = await axios.get(`https://meme-api.herokuapp.com/gimme/${subReddits[5]}/50`)
        const partSampleSeven = await axios.get(`https://meme-api.herokuapp.com/gimme/${subReddits[6]}/50`)
        const partSampleEight = await axios.get(`https://meme-api.herokuapp.com/gimme/${subReddits[7]}/50`)
        const partSampleNine = await axios.get(`https://meme-api.herokuapp.com/gimme/${subReddits[8]}/50`)
        const partSampleTen = await axios.get(`https://meme-api.herokuapp.com/gimme/${subReddits[9]}/50`)
        const memeSampleToAdd = [ 
          ...partSampleOne.data.memes, 
          ...partSampleTwo.data.memes, 
          ...partSampleThree.data.memes, 
          ...partSampleFour.data.memes, 
          ...partSampleFive.data.memes, 
          ...partSampleSix.data.memes, 
          ...partSampleSeven.data.memes, 
          ...partSampleEight.data.memes, 
          ...partSampleNine.data.memes, 
          ...partSampleTen.data.memes  ]
        //const useableSample = []
        //for (let i = 0; i < rawSample.length; i++){
        //  if (!useableSample.some(num => num === rawSample[i])){
        //    useableSample.push(rawSample[i])
        //  }
        //}     --revisit to get unique memes each time- need the if in the for loop to target sometthink like the url rather than the whole object. 
        setMemeSample(memeSampleToAdd)
        //setSearchedMemes(rawSample)
        const smallMemeSampleToAdd = []
        for (let i = 0; i < smallMemeSampleSize; i++){
          smallMemeSampleToAdd.push(memeSampleToAdd[Math.floor(Math.random() * memeSampleToAdd.length)])
        }
        console.log(smallMemeSampleToAdd)
        setSmallMemeSample(smallMemeSampleToAdd)
      } catch (err) {
        console.log(err)
      }
    }  
    getMemes()
  }, [])


  const randomise = () => {
    const smallMemeSampleToAdd = []
        for (let i = 0; i < smallMemeSampleSize; i++){
          smallMemeSampleToAdd.push(memeSample[Math.floor(Math.random() * memeSample.length)])
        }
        console.log(smallMemeSampleToAdd)
        setSmallMemeSample(smallMemeSampleToAdd)
  }

  const handleSearch = (e) => {
      let searchedMemesToAdd
      if (e.target.value !== ''){
        searchedMemesToAdd = memeSample.filter(meme => meme.title.toLowerCase().includes(e.target.value.toLowerCase()))
        //setMessage('No results- Please refine your search criteria')
      } else {
        searchedMemesToAdd = [ ...memeSample ]
      }
      setSearchedMemes(searchedMemesToAdd)
      console.log(searchedMemesToAdd)
  }

  return (
    <>
      <input type='text' placeholder='search ...' onChange={handleSearch}></input>
      <button onClick={randomise}>Randomise</button>
      <Container>
        <Row>
          {smallMemeSample.map((meme, idx) => 
            <Col key={idx} true lg="auto" className='mb-2'> {/* if we use the unique function above  change the key to the meme.url */}
                <Card> 
                <Card.Img src={meme.preview[1]} />
                  <Card.Body className='title'>
                    <Card.Title >{meme.title}</Card.Title>
                  </Card.Body>
                </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  )
}

export default Home