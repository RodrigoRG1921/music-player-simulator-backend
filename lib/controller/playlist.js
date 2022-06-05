import service from '../service/playlist' 
import { buildSuccessResponse, buildSErrorResponse } from '../utils'

const getAllPlaylist = async ({
  body,
  query
}) => {
  try {
    const response = await service.getAllPlaylist()
    return buildSuccessResponse({ data: response })
  } catch (error) {
    return buildSErrorResponse({ error })
  }
}

const createPlaylist = ({
  body,
  query
}) => {
  try {
    const response = service.createPlaylist(body);
    return buildSuccessResponse({ data: response, type: 'CREATE_PLAYLIST' })
  } catch (error) {
    return buildSErrorResponse({ error, type: error.type || 'CREATE_PLAYLIST' })
  }
}

export default {
  getAllPlaylist,
  createPlaylist
}
