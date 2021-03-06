const MAP_SUCCESS_RESPONSE_BY_TYPE = {
  default: {
    status: 200,
    message: 'Algo bien, algo Fredy'
  },
  CREATE_SONG: {
    status: 201,
    message: 'Song created correctly'
  },
  CREATE_PLAYLIST: {
    status: 201,
    message: 'Playlist created correctly'
  },
  SONG_ADDED_PLAYLIST: {
    status: 201,
    message: 'Song added into a playlist correctly'
  }
}

const MAP_ERROR_RESPONSE_BY_TYPE = {
  default: {
    status: 500,
    message: 'Error executing operation'
  },
  CREATE_SONG_VALIDATION: {
    status: 400,
    message: 'Song contains invalid information'
  },
  CREATE_SONG: {
    status: 400,
    message: 'Error creating song'
  },
  VALIDATION_ERROR: {
    status: 400,
    message: 'Error validation error'
  },
  NOT_FOUND: {
    status: 404,
    message: 'Resource not found'
  } 
}

const getSuccessResponseByType = type =>
  type ? MAP_SUCCESS_RESPONSE_BY_TYPE[type] : MAP_SUCCESS_RESPONSE_BY_TYPE.default

const getErrorResponseByType = type =>
  type ? MAP_ERROR_RESPONSE_BY_TYPE[type] : MAP_ERROR_RESPONSE_BY_TYPE.default

const SongService = (() => {
  const createSong = ({
    index
  }) => ({
    name: `song-${index}`,
    durationSeconds: generateRandom({ min: 0, max: 60 }),
    durationMinutes: generateRandom({ min: 1, max: 4 }),
    id: Date.now()
  })

  const createSongs = ({
    quantity
  }) => {
    const songs = [];
    for (let i = 0; i < quantity; i++) {
      songs.push(createSong({ index: i }))
    }
    return songs;
  }

  return {
    createSongs
  }
})()

const generateRandom = ({
  min,
  max
}) => Math.floor(Math.random() * max) + min

const buildSuccessResponse = ({
  data,
  status,
  type
}) => {
  const { message, status: successStatus } = getSuccessResponseByType(type)

  return {
    data,
    message,
    status: status || successStatus
  }
}

const buildErrorResponse = ({
  error,
  status,
  type
}) => {
  const { message, status: errorStatus } = getErrorResponseByType(type)

  return {
    message: error ? error.toString() : message,
    status: status || errorStatus
  }
}

const validateObject = ({
  expectedObject,
  compareObject
}) => {
  try {
    for (let [key, value] in compareObject) {
      if (key === 'durationSeconds' || key === 'durationMinutes') {
        if (!parseInt(value)) {
          throw { type: 'VALIDATION_ERROR' }
        }
      }
    }
    const expectedObjectKeys = Object.keys(expectedObject).sort()
    const compareObjectKeys = Object.keys(compareObject).sort()
    
    if (JSON.stringify(expectedObjectKeys) !== JSON.stringify(compareObjectKeys)) {
      throw { type: 'VALIDATION_ERROR' }
    }

  } catch (error) {
    throw error
  }
}

export {
  SongService,
  generateRandom,
  buildSuccessResponse,
  buildErrorResponse,
  validateObject
}
