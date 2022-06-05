import service from '../service/song' 

const getAllSongs = async ({
  body,
  query
}) => {
  try {
    return await service.getAllSongs()
  } catch (error) {
    throw error
  }
}

export default {
  getAllSongs
}
