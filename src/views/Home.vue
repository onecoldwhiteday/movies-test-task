<template>
  <div class="home">
    <movie-card msg="Movies" />
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {
    "movie-card": () => import("@/components/MovieCard.vue")
  }
};
</script>
