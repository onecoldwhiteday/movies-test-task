<template>
  <div class="movies">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div id="navbarCollapse" class="collapse navbar-collapse">
        <a href="/" class="h1 main-title">Movies</a>
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
          <li class="nav-item filter-button">
            <button type="button" class="btn btn-primary" @click="filterView">
              Filter &#9660;
            </button>
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
        </ul>
      </div>
    </nav>
    <movies-filter
      :get-search-id="getSearchId"
      :adult-free="adultFree"
    ></movies-filter>
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
            :disabled="!hasPrev()"
          >
            Previous
          </button>
        </li>
        <li v-if="hasFirst()">
          <button class="page-link" @click="resultHandler(1)">1</button>
        </li>
        <li v-if="hasFirst()">
          <p class="page-link">...</p>
        </li>
        <li
          v-for="page in pages"
          :class="page == currentPage ? ' page-item active' : 'page-item'"
          :key="page"
        >
          <button type="button" class="page-link" @click="resultHandler(page)">
            {{ page }}
          </button>
        </li>
        <li v-if="hasLast()">
          <p class="page-link">...</p>
        </li>
        <li v-if="hasLast()">
          <button class="page-link" @click="resultHandler(totalPages)">
            {{ totalPages + "*" }}
          </button>
        </li>
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            @click="resultHandler(goNext)"
            :disabled="!hasNext()"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
    <p>
      *MovieDB API provide only first 20,000 items(20 per page => 1000 pages)
      for all the lists(popular, top rated etc)
    </p>

    <movies-list :movies-result="moviesResult"></movies-list>
    <a href="#" title="Back on top" class="backToTop">Go to top &#9650;</a>
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
    pageRange: 3,
    searchQueries: {
      searchUrl: "discover/movie",
      sort_by: "",
      searchId: [],
      adultFree: null
    }
  }),
  computed: {
    totalPages() {
      let total =
        this.moviesResult.total_pages >= 1000
          ? 1000
          : this.moviesResult.total_pages;
      return total || 0;
    },
    pages() {
      let pages = [];
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i);
      }
      console.log(pages.length);
      return pages;
    },
    rangeStart() {
      let start = this.currentPage - this.pageRange;
      console.log(this.pageRange);
      return start > 0 ? start : 1;
    },
    rangeEnd() {
      let end = this.currentPage + this.pageRange;
      return end < this.totalPages ? end : this.totalPages;
    },
    currentPage() {
      return this.moviesResult.page;
    },
    goPrev() {
      let prevPage = this.currentPage - 1;
      return this.currentPage > 1 ? prevPage : this.currentPage;
    },
    goNext() {
      let nextPage = this.currentPage + 1;
      return this.currentPage < this.moviesResult.total_pages
        ? nextPage
        : this.currentPage;
    }
  },
  mounted() {
    this.resultHandler();
  },
  methods: {
    resultHandler(page) {
      axios
        .get(this.searchQueries.searchUrl, {
          params: {
            with_genres: this.searchQueries.searchId.toString(),
            sort_by: this.searchQueries.sort_by,
            page: page,
            include_adult: !this.searchQueries.adultFree
          }
        })
        .then(response => {
          this.moviesResult = response.data;
        })
        .catch(error => console.error(error));
    },
    getSearchId(id) {
      this.searchQueries.searchId = id.searchId;
      this.resultHandler();
      return this.searchQueries.searchId;
    },
    adultFree(adultFree) {
      this.searchQueries.adultFree = adultFree.adultFree;
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
    },
    hasFirst() {
      return this.rangeStart !== 1;
    },
    hasLast() {
      return this.rangeEnd < this.totalPages;
    },
    hasPrev() {
      return this.currentPage > 1;
    },
    hasNext() {
      return this.currentPage < this.totalPages;
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
  cursor: pointer;
}
.main-title:hover {
  text-decoration: none;
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
.backToTop {
  position: fixed;
  display: block;
  font-size: 1.5rem;
  right: 50px;
  bottom: 50px;
  color: white;
  opacity: 0.5;
}

.backToTop:hover {
  color: white;
  opacity: 1;
  text-decoration: none;
}
.nav-item {
  cursor: pointer;
}
</style>
