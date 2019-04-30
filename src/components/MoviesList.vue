<template>
  <div class="list">
    <movie-card></movie-card>
    <!-- v-for="movie in moviesResultArr"   :key="movie" -->
    <!-- :movies="moviesResultArr" -->
  </div>
</template>
<script>
export default {
  name: "MoviesList",
  components: {
    "movie-card": () => import("@/components/MovieCard.vue")
    // "pagination": () => import('@/components/Pagination.vue')
  }
};
</script>
