<template>
  <div class="container movie-card">
    <div class="poster">
      <img
        :src="
          movieData.poster_path == null
            ? defSrc
            : imgBaseSrc + movieData.poster_path
        "
        width="300px"
        height="450px"
        alt="poster"
      />
    </div>
    <div class="data">
      <p class="title h4">
        {{ movieData.original_title }}
      </p>
      <p class="date">
        {{ parseDate }}
      </p>
      <p class="overview">
        {{ movieData.overview }}
      </p>
      <p class="h2">
        {{ movieData.vote_average }}
      </p>

      <p>Popularuty: {{ movieData.popularity }}</p>
      <div class="link">
        <router-link
          :to="'/movie/' + movieData.id"
          target="_blank"
          class="btn btn-primary link"
          >More Info</router-link
        >
      </div>
    </div>
  </div>
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
    imgBaseSrc: "https://image.tmdb.org/t/p/w300",
    defSrc: "./default-poster.jpg"
  }),
  computed: {
    parseDate() {
      let year = this.movieData.release_date.slice(0, 4);
      let month = this.movieData.release_date.slice(5, 7);
      let day = this.movieData.release_date.slice(8, 10);
      return day + "." + month + "." + year;
    }
  }
};
</script>
<style>
.movie-card {
  height: 100%;
  display: flex;
}
.data {
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: flex-start;
  text-align: start;
}
</style>
