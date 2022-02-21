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
    component: () => import("../views/home/Home.vue"),
    children: [
      {
        path: "/messages",
        name: "Messages",
        component: () => import("../views/home/Messages.vue"),
      },
      {
        path: "/notifications",
        name: "Notifications",
        component: () => import("../views/home/Notifications.vue"),
      },
      {
        path: "/explore",
        name: "Explore",
        component: () => import("../views/home/Explore.vue"),
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
    component: () => import("../views/user/UserProfile.vue"),
    children: [
      {
        path: "/with-replies",
        name: "HootsReplies",
        component: () => import("../views/user/HootsReplies.vue"),
      },
      {
        path: "/media",
        name: "Media",
        component: () => import("../views/user/Media.vue"),
      },
      {
        path: "/likes",
        name: "Like",
        component: () => import("../views/user/Likes.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
