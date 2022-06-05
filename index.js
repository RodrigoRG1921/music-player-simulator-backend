import express from 'express'

import controller  from './lib/controller/song' 

const app = express()
const port = 8080

app.get('/songs', async (req, res) => {
  const songs = await controller.getAllSongs(req)
  res.status(200).json(songs)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
