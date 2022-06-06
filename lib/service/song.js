import repository from '../repository/song'

import {
  validateObject
} from '../utils'

const getAllSongs = async () => {
  try {
    const songsFromFile = await repository.loadSongsFromFile({});
    const arraySongs = songsFromFile.toString().split(', ')

    arraySongs.pop()

    return arraySongs.map(songsAsString => JSON.parse(songsAsString))
  } catch (error) {
    throw error
  }
}

const createSong = (newSong) => {
  try {
    validateObject({
      expectedObject: {
        name: '',
        durationMinutes: 0,
        durationSeconds: 0
      },
      compareObject: newSong
    })

    repository.addSong({
      ...newSong,
      id: Date.now()
    })
  } catch (error) {
    throw error
  }
}

export default {
  getAllSongs,
  createSong
}
