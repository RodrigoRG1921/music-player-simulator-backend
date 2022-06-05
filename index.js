import express from 'express'
import cors from 'cors'

import controller from './lib/controller/index' 

const app = express()
const port = 8080

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.get('/songs', async (req, res) => {
  const response = await controller.song.getAllSongs(req)
  res.status(200).json(response)
})

app.post('/songs', (req, res) => {
  const response = controller.song.createSong(req)
  res.status(200).json(response)
})

app.get('/playlists', async (req, res) => {
  const response = await controller.playlist.getAllPlaylist(req)
  res.status(200).json(response)
})

app.post('/playlists', (req, res) => {
  const response = controller.playlist.createPlaylist(req)
  res.status(200).json(response)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
