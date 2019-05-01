<template>
  <table class="table table-dark movie-card">
    <tr>
      <th>Title</th>
      <td>{{ movieData.original_title }}</td>
    </tr>
    <tr>
      <th>Poster</th>
      <td>
        <img
          :src="
            imgBaseSrc + movieData.poster_path || '@/assets/default-poster.jpg'
          "
          alt="poster"
        />
      </td>
    </tr>
    <tr>
      <th>Genre</th>
      <td>{{ getGenres }}</td>
    </tr>
    <tr>
      <th>Year</th>
      <td>{{ movieData.release_date }}</td>
    </tr>
    <tr>
      <th>Overview</th>
      <td>
        <p>
          {{ movieData.overview }}
        </p>
      </td>
    </tr>

    <tr>
      <th>Rating</th>
      <td>
        <p class="h2">
          {{ movieData.vote_average }}
        </p>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movieData: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    imgBaseSrc: "https://image.tmdb.org/t/p/w300"
  }),
  computed: {
    getGenres() {
      return this.movieData.genre_ids.toString();
    }
  }
};
</script>
