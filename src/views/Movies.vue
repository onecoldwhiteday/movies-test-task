<template>
  <div class="movies">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div id="navbarCollapse" class="collapse navbar-collapse">
        <h2 class="h1 main-title">Movies</h2>
        <ul class="navbar-nav mr-auto navbar">
          <li
            class="nav-item"
            @click="resultHandler(url, 1, 'sort_by', 'popularity.desc')"
          >
            <a class="nav-link">
              Popular
            </a>
          </li>
          <li
            class="nav-item"
            @click="resultHandler(url, 1, 'sort_by', 'vote_average.desc')"
          >
            <a class="nav-link">
              Top Rated
            </a>
          </li>
          <li class="nav-item" @click="resultHandler('/movie/upcoming', 1)">
            <a class="nav-link">
              Upcoming
            </a>
          </li>
          <li class="nav-item" @click="resultHandler('/movie/now_playing', 1)">
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
            @click="resultHandler(url, goPrev)"
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
              @click="resultHandler(url, page)"
            >
              {{ page }}
            </button>
          </li>
        </template>
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            @click="resultHandler(url, goNext)"
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
    url: "/discover/movie"
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
    resultHandler(url, page, query, category) {
      axios
        .get(url, {
          params: {
            with_genres: this.searchId.toString(),
            page: page,
            [query]: category
          }
        })
        .then(response => {
          this.moviesResult = response.data;
        })
        .catch(error => console.error(error));
    },
    // getUpcoming() {
    //   axios
    //     .get("/movie/upcoming")
    //     .then(response => {
    //       this.moviesResult = response.data;
    //     })
    //     .catch(error => console.error(error));
    // },
    // getNowPlaying() {
    //     axios
    //     .get("/movie/now_playing")
    //     .then(response => {
    //       this.moviesResult = response.data;
    //     })
    //     .catch(error => console.error(error));
    // },
    getSearchId(id) {
      this.searchId = id.searchId;
      this.resultHandler();
    },
    filterView() {
      let filter = document.querySelector(".filter");
      filter.classList.contains("hide-me")
        ? filter.classList.remove("hide-me")
        : filter.classList.add("hide-me");
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
