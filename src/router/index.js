import { createRouter, createWebHistory } from "vue-router";

import NewUser from "../pages/NewUser.vue";
import Contact from "../pages/Contact.vue";
import Post from "../pages/Post.vue";
import NewPost from "../pages/NewPost.vue";
import Main from "../pages/Main.vue";
import Login from "../pages/auth/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Main,
    meta: {
      title: "Hello",
      metaTags: [
        {
          name: "description",
          content: "The Main page of our local storage crud example app.",
        },
      ],
    },
  },
  {
    path: "/new-user",
    name: "NewUser",
    component: NewUser,
    meta: {
      title: "New User",
      metaTags: [
        {
          name: "description",
          content: "The home page of our local storage crud example app.",
        },
      ],
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
    meta: {
      title: "Contact",
      metaTags: [
        {
          name: "description",
          content: "The Contact page of our local storage crud example app.",
        },
      ],
    },
  },
  {
    path: "/post/:slug",
    name: "post",
    component: Post,
    meta: {
      title: "Post",
      metaTags: [
        {
          name: "description",
          content: "The Post page of our local storage crud example app.",
        },
      ],
    },
  },
  {
    path: "/new-post",
    name: "newpost",
    component: NewPost,
    meta: {
      title: "New Post",
      metaTags: [
        {
          name: "description",
          content: "The New Post page of our local storage crud example app.",
        },
      ],
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login",
      metaTags: [
        {
          name: "description",
          content: "The Login page of our local storage crud example app.",
        },
      ],
    },
  },
];

const router = createRouter({ history: createWebHistory("/"), routes });
router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);
  // console.log(nearestWithTitle.meta.title, "----------------");
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  const authUser = JSON.parse(localStorage.getItem("authUser")) || null;
  if (to.fullPath === "/") {
    if (!authUser) {
      next("/login");
    }
  }
  if (to.fullPath === "/login") {
    if (authUser) {
      // next("/");
      next(from);
    }
  }
  next();
});
export default router;
