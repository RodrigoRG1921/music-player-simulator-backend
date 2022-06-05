import repository from '../repository/playlist'

import {
  validateObject
} from '../utils'

const getAllPlaylist = async () => {
  try {
    const playlistFromFile = await repository.loadPlaylistFromFile({});

    const arrayPlaylist = playlistFromFile.toString().split(', ')

    arrayPlaylist.pop()

    return arrayPlaylist.map(playlistAsString => JSON.parse(playlistAsString))
  } catch (error) {
    throw error
  }
}

const createPlaylist = (newPlaylist) => {
  try {
    validateObject({
      expectedObject: {
        name: '',
        description: ''
      },
      compareObject: newPlaylist
    })

    repository.addPlaylist({
      ...newPlaylist,
      songs: [],
      id: Date.now()
    })
  } catch (error) {
    throw error
  }
}

export default {
  getAllPlaylist,
  createPlaylist
}
