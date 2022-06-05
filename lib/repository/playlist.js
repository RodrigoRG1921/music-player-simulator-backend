import fs from 'fs'
import 'dotenv/config'

const loadPlaylistFromFile = async ({
  path
}) => {
  try {
    const pathFile = path || `${process.env.DEFAULT_FILE_PATH}/${process.env.PLAYLIST_FILE_NAME}`
    return await fs.promises.readFile(pathFile)
  } catch (error) {
    console.error(error)
    throw error
  }
}

const addPlaylist = (newPlaylist) => {
  try {
    const pathFile = `${process.env.DEFAULT_FILE_PATH}/${process.env.PLAYLIST_FILE_NAME}`
    fs.appendFileSync(pathFile, `${JSON.stringify(newPlaylist)}, `)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default {
  loadPlaylistFromFile,
  addPlaylist
}
