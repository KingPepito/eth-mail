
const express = require('express')
const cors = require('cors');

const app = express()
const port = 8000

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {

  console.log('GEt /')
  res.send('Hello World!')
})

app.post('/send/:address', (req, res) => {
  const {address} = req.params
  if(address){
    console.log('post send /', address)
  }

  
  res.send('Hello World!')
})

app.post('/accept/:address', (req, res) => {

  console.log('post accept /', req)
  res.send('Hello World!')
})

app.post('/refuse/:address', (req, res) => {

  console.log('post refuse /', req)
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

