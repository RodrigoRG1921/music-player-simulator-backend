import repository from '../repository/song'

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

export default {
  getAllSongs
}
