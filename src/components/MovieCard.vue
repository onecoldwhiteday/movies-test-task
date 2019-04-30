<template>
  <div class="movie">
    <pre>{{ movieData }}</pre>
  </div>
</template>

<script>
import axios from "@/main-axios.js";

export default {
  name: "MovieCard",
  data: () => ({
    movieData: []
  }),
  mounted() {
    this.getMovie();
  },
  methods: {
    getMovie() {
      axios
        .get("/movie/551")
        .then(response => {
          this.movieData = response.data;
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
