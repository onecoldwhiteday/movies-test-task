<template>
  <div class="list">
    <movie-card></movie-card>
  </div>
</template>
<script>
export default {
  name: "MoviesList",
  components: {
    "movie-card": () => import("@/components/MovieCard.vue")
  }
};
</script>
