import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomeView.vue";
import Projects from "./views/ProjectsView.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/projects/:slug?", name: "Projects", component: Projects },
  { path: "/courses", name: "Courses", component: () => import("./views/CoursesView.vue") },
  { path: "/about", name: "About", component: () => import("./views/AboutView.vue") },
  { path: "/links", name: "Links", component: () => import("./views/LinksView.vue") },
  { path: "/contact", name: "Contact", component: () => import("./views/ContactView.vue") },
];

const router = createRouter({
  history: createWebHistory('/paginaProyectos/'),
  routes,
  // Switching projects inside the Projects page keeps the scroll position; other navigations start at the top.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.name === from.name) return false;
    return { top: 0 };
  },
});

export default router;
