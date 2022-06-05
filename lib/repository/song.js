import fs from 'fs'
import 'dotenv/config'

import { SongService } from '../utils'

const createSongsFile = () => {
  try {
    const file = fs.createWriteStream(`${process.env.SONGS_FILE_PATH}/${process.env.SONGS_FILE_NAME}`)

    file.on('error', function(err) { 
      console.error(err)
    })
    
    const songs = SongService.createSongs({ quantity: 50 })

    songs.forEach((song) => {
      const songObjectToString = JSON.stringify(song)
      file.write(`${songObjectToString}, `)
    })

    file.end()

    return songs
  } catch (error) {
    console.error(error)
  }
}

const loadSongsFromFile = async ({
  path
}) => {
  try {
    const pathFile = path || `${process.env.SONGS_FILE_PATH}/${process.env.SONGS_FILE_NAME}`
    return await fs.promises.readFile(pathFile)
  } catch (error) {
    console.error(error)
    throw error
  }
}

const addSong = (newSong) => {
  try {
    const pathFile = `${process.env.SONGS_FILE_PATH}/${process.env.SONGS_FILE_NAME}`
    fs.appendFileSync(pathFile, `${JSON.stringify(newSong)}, `)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default {
  loadSongsFromFile,
  createSongsFile,
  addSong
}
