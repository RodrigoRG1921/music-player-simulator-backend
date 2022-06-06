import repository from '../repository/playlist'
import songService from './song'

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

const getPlaylistById = async ({ id }) => {
  try {
    const playlists = await getAllPlaylist()

    const playlist = playlists.find(_playlist => _playlist.id == id)

    if (!playlist) {
      throw { type: 'NOT_FOUND' }
    }

    const _songs = await songService.getAllSongs()

    const songs = _songs.reduce((accumulator, song) => ({
      ...accumulator,
      [song.id]: song
    }), {})

    for (let i = 0; i < playlist.songs.length; i++) {
      const idSong = playlist.songs[i]
      playlist.songs[i] = songs[idSong]
    }

    return playlist
  } catch (error) {
    throw error
  }
}

const addSongToPlaylist = async ({
  id,
  idSong
}) => {
  try {
    const playlists = await getAllPlaylist()

    for (let i = 0; i < playlists.length; i++) {
      if (playlists[i].id == id) {
        playlists[i].songs.push(idSong)
      }
    }

    await repository.updatePlaylists({ playlists })
  } catch (error) {
    throw error
  }
}

export default {
  getAllPlaylist,
  createPlaylist,
  getPlaylistById,
  addSongToPlaylist
}
