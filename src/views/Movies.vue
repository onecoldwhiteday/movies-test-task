<template>
  <div class="movies">
    <h2 class="h1">Movies</h2>
    <movies-filter :get-search-id="getSearchId"></movies-filter>
    <p class="h4">
      Total results: <span class="num">{{ moviesResult.total_results }}</span>
    </p>
    <movies-list :movies-result="moviesResult"></movies-list>
  </div>
</template>

<script>
import axios from "@/main-axios.js";

export default {
  name: "Movies",
  components: {
    "movies-list": () => import("@/components/MoviesList.vue"),
    "movies-filter": () => import("@/components/MoviesFilter.vue")
  },
  data: () => ({
    moviesResult: {},
    searchId: []
  }),
  // mounted() {
  //   this.
  // },
  methods: {
    searchIdHandler() {
      axios
        .get("/discover/movie", {
          params: {
            with_genres: this.searchId.toString()
          }
        })
        .then(response => {
          this.moviesResult = response.data;
        })
        .catch(error => console.error(error));
    },
    getSearchId(id) {
      this.searchId = id.searchId;
      this.searchIdHandler();
    }
  }
};
</script>
<style>
.num {
  font-size: 1.5rem;
  color: red;
}
.movies {
  background-color: gray;
}
</style>
