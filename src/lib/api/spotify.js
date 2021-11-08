export default {
  artist: {
    get: () => {

    },
    getTopTracks: () => {

    }
  },

  me: {
    get: (authedFetch) =>  authedFetch("https://api.spotify.com/v1/me")
  },

  recommendations: {
    get: () => {

    },
    getAvailableGenreSeeds: (authedFetch) => authedFetch("https://api.spotify.com/v1/recommendations/available-genre-seeds")
  }


}
