import { createStore } from "vuex";
import users from "./modules/users";
import posts from "./modules/posts";
// Create Store
const store = createStore({
  modules: {
    users,
    posts,
  },
});

export default store;
