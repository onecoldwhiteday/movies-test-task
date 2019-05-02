<template>
  <div class="movies">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div id="navbarCollapse" class="collapse navbar-collapse">
        <h2 class="h1 main-title">Movies</h2>
        <ul class="navbar-nav mr-auto navbar">
          <li
            class="nav-item"
            @click="
              updateQueries('discover/movie', 'popularity.desc'),
                resultHandler()
            "
          >
            <a class="nav-link">
              Popular
            </a>
          </li>
          <li
            class="nav-item"
            @click="
              updateQueries('discover/movie', 'vote_average.desc'),
                resultHandler()
            "
          >
            <a class="nav-link">
              Top Rated
            </a>
          </li>
          <li
            class="nav-item"
            @click="updateQueries('movie/upcoming'), resultHandler()"
          >
            <a class="nav-link">
              Upcoming
            </a>
          </li>
          <li
            class="nav-item"
            @click="updateQueries('movie/now_playing'), resultHandler()"
          >
            <a class="nav-link">
              Now Playing
            </a>
          </li>

          <li class="nav-item filter-button">
            <button type="button" class="btn btn-primary" @click="filterView">
              Filter &#9660;
            </button>
          </li>
        </ul>
      </div>
    </nav>
    <movies-filter :get-search-id="getSearchId"></movies-filter>
    <div class="results-info">
      <p>
        Total results: <span class="num">{{ moviesResult.total_results }}</span>
      </p>
      <p>
        Total pages: <span class="num">{{ moviesResult.total_pages }}</span>
      </p>
      <p>
        Current Page: <span class="num">{{ moviesResult.page }}</span>
      </p>
    </div>

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
        <template v-if="totalPages < 45">
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
    searchId: [],
    searchQueries: {
      searchUrl: "discover/movie",
      sort_by: ""
    }
  }),
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
        .get(this.searchQueries.searchUrl, {
          params: {
            with_genres: this.searchId.toString(),
            sort_by: this.searchQueries.sort_by,
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
    },
    filterView() {
      let filter = document.querySelector(".filter");
      filter.classList.contains("hide-me")
        ? filter.classList.remove("hide-me")
        : filter.classList.add("hide-me");
    },
    updateQueries(searchUrl, sort_by) {
      this.searchQueries.searchUrl = searchUrl;
      this.searchQueries.sort_by = sort_by;
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
  margin: 30px;
}

.main-title {
  padding: 30px;
  color: white;
}
.filter-button {
  align-self: flex-end;
}
.navbar {
  display: flex;
}

.results-info {
  width: 500px;
  margin-top: 130px;
  padding: 50px;
  display: flex;
  justify-content: space-around;
}
</style>
