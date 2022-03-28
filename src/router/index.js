import { createRouter, createWebHistory } from "vue-router";
import store from "../store/store";

const routes = [
  {
    path: "/",
    name: "Landing Page",
    component: () => import("@/views/authentication/LandingPage.vue"),
    children: [
      {
        path: "/signup",
        name: "Signup",
        component: () => import("@/views/authentication/Signup.vue"),
        meta: { guest: true },
      },
    ],
    meta: { guest: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/authentication/Login.vue"),
    meta: { guest: true },
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("@/views/authentication/Logout.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/Home.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/home/Index.vue"),
      },
      {
        path: "/messages",
        name: "Messages",
        component: () => import("@/views/home/Messages.vue"),
      },
      {
        path: "/notifications",
        name: "Notifications",
        component: () => import("@/views/home/Notifications.vue"),
        children: [
          {
            path: "/notifications/mentions",
            name: "Mentions",
            redirect: "/notifications",
          },
        ],
      },
      {
        path: "/explore",
        name: "Explore",
        component: () => import("@/views/home/Explore.vue"),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/compose",
    name: "Compose",
    component: () => import("../views/ComposeHoot.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/user",
    redirect: "/home",
    meta: { requiresAuth: true },
  },
  {
    path: "/user/:username",
    name: "User Profile",
    component: () => import("@/views/user/UserProfile.vue"),
    children: [
      {
        path: "",
        name: "Hoots",
        component: () => import("@/views/user/AllHoots.vue"),
        props: true,
      },
      {
        path: "with-replies",
        name: "Hoots & replies",
        component: () => import("@/views/user/HootsReplies.vue"),
        props: true,
      },
      {
        path: "media",
        name: "Media",
        component: () => import("@/views/user/Media.vue"),
        props: true,
      },
      {
        path: "likes",
        name: "Likes",
        component: () => import("@/views/user/Likes.vue"),
        props: true,
      },
      {
        path: "status/:hootId",
        name: "Status",
        component: () => import("@/views/user/Status.vue"),
        props: true,
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    component: () => import("@/views/PageNotFound.vue"),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["user/isAuthenticated"];
  const checkMeta = (prop) => to.matched.some((record) => record.meta[prop]);

  if (isAuthenticated) {
    if (checkMeta("requiresAuth")) {
      next();
    } else if (checkMeta("guest")) {
      next({ path: "/home" });
    } else {
      next();
    }
  } else {
    if (checkMeta("requiresAuth")) {
      next({ path: "/login" });
    } else if (checkMeta("guest")) {
      next();
    } else {
      next();
    }
  }
});

export default router;
