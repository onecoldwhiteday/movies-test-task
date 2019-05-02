<template>
  <div>
    <div
      class="movie-info"
      :style="
        'background-image: url(' +
          imgBaseSrc +
          'original' +
          movieData.backdrop_path +
          ')'
      "
    >
      <div class="main-info">
        <h2 class="movie-title">
          {{ movieData.original_title }} ({{ parseYear }})
        </h2>

        <div class="poster">
          <img
            :src="imgBaseSrc + 'w500' + movieData.poster_path"
            alt="poster"
          />
        </div>

        <p class="section-title">Rating:</p>
        <span class="rating">{{ movieData.vote_average }}</span>

        <p class="section-title">Overview:</p>
        <p class="overview">
          {{ movieData.overview }}
        </p>

        <p class="section-title">Genres:</p>
        <p>{{ parseGenres }}</p>

        <p class="section-title">Budget:</p>
        <p>${{ movieData.budget }}</p>

        <p class="section-title">Countries:</p>
        <p>{{ parseCountries }}</p>

        <p class="section-title">Director</p>
        <img
          :src="imgBaseSrc + 'w185' + credits.crew[0].profile_path"
          :alt="credits.crew[0].name"
          onerror="this.style.display='none'"
        />
        <p class="role">{{ this.credits.crew[0].name }}</p>

        <p class="section-title">Official website:</p>
        <a :href="movieData.homepage" target="_blank">{{
          movieData.homepage || "No website :("
        }}</a>
        <p class="company_logos">
          <img
            :src="renderCompanyLogo(company)"
            v-for="company in movieData.production_companies"
            :key="company"
            alt="company"
            class="company-logo"
            onerror="this.style.display='none'"
            width="64"
          />
        </p>
        <div class="top-cast">
          <div
            class="cast-card"
            v-for="actor in this.credits.cast.slice(0, 5)"
            :key="actor.cast_id"
          >
            <img
              :src="
                actor.profile_path === null
                  ? defActor
                  : imgBaseSrc + 'w185' + actor.profile_path
              "
              :alt="actor.name"
              width="185"
              height="278"
            />
            <p class="role">{{ actor.character }}</p>
            <p>{{ actor.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/main-axios.js";

export default {
  name: "Movie",
  data: () => ({
    movieData: {},
    imgBaseSrc: "https://image.tmdb.org/t/p/",
    credits: null,
    defActor: "../default-actor.png"
  }),
  computed: {
    movieId() {
      return this.$route.params.id;
    },
    parseYear() {
      let year = this.movieData.release_date.slice(0, 4);
      return year;
    },
    parseGenres() {
      let genres = [];
      this.movieData.genres.forEach(genre => {
        genres.push(genre.name);
      });
      return genres.toString();
    },
    parseCountries() {
      let countries = [];
      this.movieData.production_countries.forEach(country => {
        countries.push(country.name);
      });
      return countries.toString();
    }
  },
  mounted() {
    this.getMovie();
    this.getCredits();
  },
  methods: {
    getMovie() {
      axios
        .get("movie/" + this.movieId)
        .then(response => {
          this.movieData = response.data;
        })
        .catch(error => console.error(error));
    },
    renderCompanyLogo(company) {
      return this.imgBaseSrc + "w300" + company.logo_path;
    },
    getCredits() {
      axios
        .get("movie/" + this.movieId + "/credits", {
          params: {
            append_to_response: "credits"
          }
        })
        .then(response => {
          this.credits = response.data;
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
<style>
.movie-info {
  display: flex;
  color: white;
}
.main-info {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;
  background-color: rgba(0, 0, 0, 0.7);
  margin: 0 auto;
}
.poster {
  position: absolute;
  align-self: flex-end;
}
.rating {
  font-size: 2.5rem;
  color: green;
  font-weight: bold;
}
.overview {
  width: 400px;
  text-align: left;
}
.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
}
.company-logo {
  margin-top: 15px;
  margin-right: 20px;
}
.top-cast {
  display: flex;
  justify-content: space-around;
  width: 80%;
}
.role {
  text-decoration: underline;
  margin-top: 10px;
  margin-bottom: 0;
  font-weight: bold;
}
.company_logos {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 100px;
  padding: 10px;
}
</style>
