<template>
  <div class="filter hide-me">
    <form>
      <!-- <p class="h4 search-title">Choose genres to show:</p> -->
      <p>Filter(genre)</p>
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
    <button type="button" class="btn btn-primary" @click="getSearchQuery">
      Show
    </button>
  </div>
</template>
<script>
import axios from "@/main-axios.js";

export default {
  name: "MoviesFilter",
  props: ["getSearchId"],
  data: () => ({
    genresList: [],
    searchId: []
  }),
  mounted() {
    this.getGenresList();
  },
  methods: {
    getGenresList() {
      axios
        .get("/genre/movie/list")
        .then(response => {
          this.genresList = response.data.genres;
        })
        .catch(error => console.error(error));
    },
    getSearchQuery() {
      this.getSearchId({
        searchId: this.searchId
      });
    }
  }
};
</script>
<style>
.search-title {
  margin-bottom: 30px;
}

.filter {
  margin-bottom: 50px;
  color: white;
  background-color: #454d55;
  padding: 50px;
  font-size: 1.3rem;
  margin-top: 130px;
}

.form-check-input {
  zoom: 1.5;
}

.hide-me {
  display: none;
}
</style>
