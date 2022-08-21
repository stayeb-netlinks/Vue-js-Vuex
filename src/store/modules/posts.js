const state = {
  posts: [],
};

const getters = {
  allPosts: (state) => state.posts,
};

const actions = {
  async fetchPosts({ commit }) {
    const posts = JSON.parse(localStorage.getItem("postsList")) || [];
    commit("SET_POSTS", posts);
  },
};

const mutations = {
  SET_POSTS: (state, posts) => (state.posts = posts),
};

export default {
  state,
  actions,
  mutations,
  getters,
};
