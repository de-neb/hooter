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
        path: "",
        name: "Home",
        component: () => import("../views/home/Index.vue"),
      },
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
    redirect: "/home",
  },
  {
    path: "/user/:username",
    name: "UserProfile",
    component: () => import("../views/user/UserProfile.vue"),
    children: [
      {
        path: "",
        name: "AllHoots",
        component: () => import("../views/user/AllHoots.vue"),
        props: true,
      },
      {
        path: "with-replies",
        name: "HootsReplies",
        component: () => import("../views/user/HootsReplies.vue"),
        props: true,
      },
      {
        path: "media",
        name: "Media",
        component: () => import("../views/user/Media.vue"),
        props: true,
      },
      {
        path: "likes",
        name: "Likes",
        component: () => import("../views/user/Likes.vue"),
        props: true,
      },
      {
        path: "status/:hootId",
        name: "Status",
        component: () => import("../views/user/Status.vue"),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
