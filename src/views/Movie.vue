<template>
  <div>
    <div
      class="movie-info"
      :style="
        'background-image: url(' +
          imgBaseSrc +
          'original' +
          movieData.backdrop_path +
          ')'
      "
    >
      <div class="poster">
        <img :src="imgBaseSrc + 'w500' + movieData.poster_path" alt="poster" />
      </div>
      <div class="main-info">
        <h2 class="movie-title">
          {{ movieData.original_title }} ({{ parseYear }})
        </h2>

        <p class="section-title">Rating:</p>
        <span class="rating">{{ movieData.vote_average }}</span>

        <p class="section-title">Overview:</p>
        <p class="overview">
          {{ movieData.overview }}
        </p>

        <p class="section-title">Genres:</p>
        <p>{{ parseGenres }}</p>

        <p class="section-title">Budget:</p>
        <p>${{ movieData.budget }}</p>

        <p class="section-title">Official website:</p>
        <a :href="movieData.homepage" target="_blank">{{
          movieData.homepage
        }}</a>
      </div>
    </div>
    <pre>{{ movieData }}</pre>
  </div>
</template>
<script>
import axios from "@/main-axios.js";

export default {
  name: "Movie",
  data: () => ({
    movieData: {},
    imgBaseSrc: "https://image.tmdb.org/t/p/"
  }),
  computed: {
    movieId() {
      return this.$route.params.id;
    },
    parseYear() {
      let year = this.movieData.release_date.slice(0, 4);
      return year;
    },
    parseGenres() {
      let genres = [];
      this.movieData.genres.forEach(genre => {
        genres.push(genre.name);
      });
      return genres.toString();
    }
  },
  mounted() {
    this.getMovie();
  },
  methods: {
    getMovie() {
      axios
        .get("movie/" + this.movieId)
        .then(response => {
          this.movieData = response.data;
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
<style>
.movie-info {
  display: flex;
  backdrop-filter: blur(8px);
  color: white;
}
.main-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;
  background-color: rgba(0, 0, 0, 0.7);
}
.rating {
  font-size: 2.5rem;
  color: green;
  font-weight: bold;
}
.overview {
  width: 400px;
  text-align: left;
}
.section-title {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
