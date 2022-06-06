import service from '../service/playlist' 
import { buildSuccessResponse, buildErrorResponse } from '../utils'

const getAllPlaylist = async ({
  body,
  query
}) => {
  try {
    const response = await service.getAllPlaylist()
    return buildSuccessResponse({ data: response })
  } catch (error) {
    return buildErrorResponse({ type: error.type || 'default' })
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
    return buildErrorResponse({ type: error.type || 'CREATE_PLAYLIST' })
  }
}

const getPlaylistById = async ({
  params
}) => {
  try {
    const response = await service.getPlaylistById({ id: params.id })
    return buildSuccessResponse({ data: response })
  } catch (error) {
    return buildErrorResponse({ type: error.type || 'NOT_FOUND' })
  }
}

const addSongToPlaylist = async ({
  params,
  body
}) => {
  try {
    const response = await service.addSongToPlaylist({ id: params.id, idSong: params.id_song })
    return buildSuccessResponse({ type: 'SONG_ADDED_PLAYLIST' })
  } catch (error) {
    return buildErrorResponse({ type: error.type || 'NOT_FOUND' })
  }
}

export default {
  getAllPlaylist,
  createPlaylist,
  getPlaylistById,
  addSongToPlaylist
}
