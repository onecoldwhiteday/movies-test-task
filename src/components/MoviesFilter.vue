<template>
  <div class="filter">
    <form>
      <p class="h4 search-title">Choose your fav genres to show:</p>

      <div class="form-group row" aria-required="true">
        <div
          v-for="genre in genresList"
          :key="genre.id"
          class="form-check col-sm-4"
        >
          <label :for="genre.name" class="form-check-label col-sm-4">{{
            genre.name
          }}</label>
          <input
            type="checkbox"
            name="genre"
            :id="genre.name"
            :value="genre.id"
            class="form-check-input"
            v-model="searchId"
          />
        </div>
      </div>
    </form>
    <button type="button" class="btn btn-primary" @click="searchHandler()">
      Show
    </button>

    <pre>{{ moviesResultArr }}</pre>
  </div>
</template>
<script>
import axios from "@/main-axios.js";

export default {
  name: "MoviesFilter",
  data: () => ({
    moviesResultArr: [],
    genresList: [],
    searchId: []
  }),
  mounted() {
    this.getGenresList();
  },
  methods: {
    searchHandler() {
      axios
        .get("/discover/movie", {
          params: {
            with_genres: this.searchId.toString()
          }
        })
        .then(response => {
          this.moviesResultArr = response.data;
        })
        .catch(error => console.error(error));
    },
    getGenresList() {
      axios
        .get("/genre/movie/list")
        .then(response => {
          this.genresList = response.data.genres;
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
<style>
.search-title {
  margin-bottom: 30px;
}
</style>
