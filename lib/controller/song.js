import service from '../service/song' 
import { buildSuccessResponse, buildErrorResponse } from '../utils'

const getAllSongs = async ({
  body,
  query
}) => {
  try {
    const response = await service.getAllSongs()
    return buildSuccessResponse({ data: response })
  } catch (error) {
    return buildErrorResponse({ type: error.type || 'default' })
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
    return buildErrorResponse({ type: error.type || 'CREATE_SONG' })
  }
}

export default {
  getAllSongs,
  createSong
}
