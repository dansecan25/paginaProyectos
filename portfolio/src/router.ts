import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomeView.vue";
import Projects from "./views/ProjectsView.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/courses", name: "Courses", component: () => import("./views/CoursesView.vue") },
  { path: "/about", name: "About", component: () => import("./views/AboutView.vue") },
  { path: "/links", name: "Links", component: () => import("./views/LinksView.vue") },
];

const router = createRouter({
  history: createWebHistory('/paginaProyectos/'),
  routes,
});

export default router;
