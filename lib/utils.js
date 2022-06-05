const SongService = (() => {
  const createSong = ({
    index
  }) => ({
    name: `song-${index}`,
    durationSeconds: generateRandom({ min: 0, max: 60 }),
    durationMinutes: generateRandom({ min: 1, max: 4 })
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

export {
  SongService,
  generateRandom
}
