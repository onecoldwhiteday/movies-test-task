<template>
  <div class="filter hide-me">
    <form>
      <p>Filter(genre)</p>

      <!-- WARNING!
      filter works only with SORTED by popularity and top rated movies

      Upcoming and Now Playing ones we get from DIFFERENT url and genres query doesn't work with it

       -->

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
    <form>
      <p>Parent control:</p>
      <div class="form-group column">
        <div>
          <label for="parentControl" class="form-check-label"
            >Don't show adult movies</label
          >
          <input
            type="checkbox"
            id="parentControl"
            class="form-check-input col-sm-1"
            @change="handleCheck"
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
  props: ["getSearchId", "adultFree"],
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
    },
    handleCheck() {
      this.adultFree({
        adultFree: document.getElementById("parentControl").checked
          ? true
          : false
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
