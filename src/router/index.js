import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: () => import("../views/LandingPage.vue"),
    children: [
      {
        path: "/signup",
        name: "Signup",
        component: () => import("../views/Signup.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/messages",
        name: "Messages",
        component: () => import("../views/Messages.vue"),
      },
      {
        path: "/notifications",
        name: "Notifications",
        component: () => import("../views/Notifications.vue"),
      },
      {
        path: "/explore",
        name: "Explore",
        component: () => import("../views/Explore.vue"),
      },
    ],
  },
  {
    path: "/compose",
    name: "Compose",
    component: () => import("../views/ComposeHoot.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/UserProfile.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
