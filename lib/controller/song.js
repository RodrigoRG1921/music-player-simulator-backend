import service from '../service/song' 
import { buildSuccessResponse, buildSErrorResponse } from '../utils'

const getAllSongs = async ({
  body,
  query
}) => {
  try {
    const response = await service.getAllSongs()
    return buildSuccessResponse({ data: response })
  } catch (error) {
    return buildSErrorResponse({ error })
  }
}

const createSong = ({
  body,
  query
}) => {
  try {
    const response = service.createSong(body);
    return buildSuccessResponse({ data: response, type: 'CREATE_SONG' })
  } catch (error) {
    return buildSErrorResponse({ error, type: error.type || 'CREATE_SONG' })
  }
}

export default {
  getAllSongs,
  createSong
}
