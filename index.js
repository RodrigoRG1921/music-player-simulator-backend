import express from 'express'

import controller  from './lib/controller/song' 

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.get('/songs', async (req, res) => {
  const response = await controller.getAllSongs(req)
  res.status(200).json(response)
})

app.post('/songs', (req, res) => {
  const response = controller.createSong(req)
  res.status(200).json(response)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
