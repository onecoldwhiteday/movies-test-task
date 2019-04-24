<template>
  <div class="Movie">
    <table class="table table-dark col-sm-8 movie-card">
      <tr>
        <th colspan="2">{{ movieData.original_title }}</th>
      </tr>
      <tr>
        <th>Adult:</th>
        <td>{{ isAdult }}</td>
      </tr>
      <tr>
        <th>Budget:</th>
        <td>${{ movieData.budget }}</td>
      </tr>
      <tr>
        <th>Genres:</th>
        <td>{{ genresList }}</td>
      </tr>
      <tr>
        <th>Original Language</th>
        <td>{{ movieData.original_language }}</td>
      </tr>
      <tr>
        <th>OverView</th>
        <td>{{ movieData.overview }}</td>
      </tr>
      <tr>
        <th>Poster:</th>
        <td>
          <img :src="posterUrl" alt="poster" />
        </td>
      </tr>
    </table>

    <pre>{{ movieData }}</pre>
  </div>
</template>

<script>
import axios from "@/axios.js";

export default {
  name: "MovieCard",
  data: () => ({
    movieData: {}
  }),
  computed: {
    genresList() {
      return this.movieData.genres.map(genre => genre.name).join(", ");
    },
    isAdult() {
      return this.movieData.adult ? "Yes" : "No";
    },
    posterUrl() {
      return "https://image.tmdb.org/t/p/w500" + this.movieData.poster_path;
    }
  },
  mounted() {
    this.loadMovies();
    console.log("MovieCard is mounted successfully");
  },
  methods: {
    loadMovies() {
      axios
        .get("movie/551")
        .then(response => {
          this.movieData = response.data;
        })
        .catch(error => console.error(error));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.movie-card {
  margin: 0 auto;
}
</style>
