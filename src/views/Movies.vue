<template>
  <div class="movies">
    <h2>Movies</h2>
    <movies-filter></movies-filter>
    <movies-list></movies-list>
  </div>
</template>

<script>
export default {
  name: "Movies",
  components: {
    "movies-list": () => import("@/components/MoviesList.vue"),
    "movies-filter": () => import("@/components/MoviesFilter.vue")
  }
};
</script>
