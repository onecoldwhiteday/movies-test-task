<template>
  <div class="movies">
    <h2 class="h1">Movies</h2>
    <movies-filter :get-search-id="getSearchId"></movies-filter>
    <p class="h4">
      Total results: <span class="num">{{ moviesResult.total_results }}</span>
    </p>
    <movies-list :movies-result="moviesResult"></movies-list>

    <nav class="pagination-block">
      <ul class="pagination">
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            @click="resultHandler(goPrev)"
          >
            Previous
          </button>
        </li>
        <template v-if="totalPages < 50">
          <li
            v-for="page in totalPages"
            :class="page == currentPage ? ' page-item active' : 'page-item'"
            :key="page"
          >
            <button
              type="button"
              class="page-link"
              @click="resultHandler(page)"
            >
              {{ page }}
            </button>
          </li>
        </template>
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            @click="resultHandler(goNext)"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
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
  computed: {
    currentPage() {
      return this.moviesResult.page;
    },
    totalPages() {
      return this.moviesResult.total_pages;
    },
    goPrev() {
      let prevPage = this.currentPage - 1;
      this.currentPage > 1 ? prevPage : this.currentPage;
      return prevPage;
    },
    goNext() {
      let nextPage = this.currentPage + 1;
      this.currentPage < this.moviesResult.totalPages
        ? nextPage
        : this.currentPage;
      return nextPage;
    }
  },
  methods: {
    resultHandler(page) {
      axios
        .get("/discover/movie", {
          params: {
            with_genres: this.searchId.toString(),
            page: page
          }
        })
        .then(response => {
          this.moviesResult = response.data;
        })
        .catch(error => console.error(error));
    },
    getSearchId(id) {
      this.searchId = id.searchId;
      this.resultHandler();
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

.pagination-block {
  display: flex;
  justify-content: center;
}
</style>
