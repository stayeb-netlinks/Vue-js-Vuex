const state = {
  users: [],
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,
};

const getters = {
  allUsers: (state) => state.users,
  authUser: (state) => state.authUser,
};

const actions = {
  async fetchUsers({ commit }) {
    const users = JSON.parse(localStorage.getItem("usersList")) || [];
    commit("SET_USERS", users);
  },
  async addUser({ commit }, user) {
    commit("ADD_USER", user);
  },
};

const mutations = {
  SET_USERS: (state, users) => (state.users = users),
  ADD_USER: (state, user) => {
    state.users.push(user);
    localStorage.setItem("usersList", JSON.stringify(state.users));
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
