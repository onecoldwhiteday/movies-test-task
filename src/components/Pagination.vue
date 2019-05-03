<template>
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
        :class="page == currentPage ? 'page-item active' : 'page-item'"
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
    <p class="warning">
      *MovieDB API provide only first 20,000 items(20 per page => 1000 pages)
      for all the lists(popular, top rated etc)
    </p>
  </nav>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    moviesResult: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    pageRange: 3
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
  methods: {
    resultHandler(page) {
      this.$emit("callResultHandler", page);
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
.pagination-block {
  margin-top: 200px;
}
.warning {
  font-size: 0.8rem;
  padding-left: 10px;
}
</style>
