import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Movies",
      component: () => import("@/views/Movies.vue")
    },
    {
      path: "/movie/:id",
      name: "Movie",
      component: () => import("@/views/Movie.vue")
    }
  ]
});
