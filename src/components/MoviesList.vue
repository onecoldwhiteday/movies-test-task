<template>
  <div>
    <div class="movies-list">
      <movie-card
        v-for="movie in moviesResultArr"
        :key="movie.id"
        :movie-data="movie"
      ></movie-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "MoviesList",
  components: {
    "movie-card": () => import("@/components/MovieCard.vue")
  },
  props: {
    moviesResult: {
      type: Object,
      required: true
    }
  },
  computed: {
    moviesResultArr() {
      return this.moviesResult.results;
    }
  }
};
</script>
<style>
.movies-list {
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
}
</style>
