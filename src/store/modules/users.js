const state = {
  users: [],
  authUser: null,
  errMsg: "",
};

const getters = {
  allUsers: (state) => state.users,
  authUser: (state) => state.authUser,
  errMsg: (state) => state.errMsg,
};

const actions = {
  async fetchAuthUser({ commit }) {
    const authUser = JSON.parse(localStorage.getItem("authUser")) || null;
    commit("SET_AUTH_USER", { user: authUser, errMsg: "" });
  },
  async fetchUsers({ commit }) {
    const users = JSON.parse(localStorage.getItem("usersList")) || [];
    commit("SET_USERS", users);
  },
  async addUser({ commit }, user) {
    let index = state.users.findIndex((u) => u.email === user.email);
    if (index === -1) {
      // new user
      commit("ADD_USER", user);
    } else {
      // old user
      commit("ADD_USER", { ...user, index });
    }
  },
  async removeUser({ commit }, userEmail) {
    commit("REMOVE_USER", userEmail);
  },
  async updateUser({ commit }, user) {
    const userIndex = state.users.findIndex((u) => u.email === user.email);
    commit("UPDATE_USER", { user, index: userIndex });
  },
  async login({ commit }, user) {
    if (state.users.length > 0) {
      const filteredUser = state.users.filter(
        (u) => u.email === user.email && u.password === user.password
      );
      if (filteredUser.length > 0) {
        commit("SET_AUTH_USER", { user: filteredUser[0], errMsg: "" });
        // this.$route.push("/");
      } else {
        commit("SET_AUTH_USER", {
          user: filteredUser[0],
          errMsg: "Email or Password is Wrong!",
        });
      }
    }
  },
  async logout({ commit }) {
    commit("LOGOUT");
  },
};

const mutations = {
  SET_USERS: (state, users) => (state.users = users),
  ADD_USER: (state, user) => {
    const { index, ...others } = user;

    if (index >= 0) {
      state.users[index] = others;
    } else {
      state.users.push(others);
    }
    localStorage.setItem("usersList", JSON.stringify(state.users));
  },
  REMOVE_USER: (state, userEmail) => {
    state.users = state.users.filter((u) => u.email != userEmail);
    localStorage.setItem("usersList", JSON.stringify(state.users));
  },
  LOGOUT: (state) => {
    state.authUser = null;
    localStorage.removeItem("authUser");
  },
  SET_AUTH_USER: (state, { user, errMsg }) => {
    state.authUser = user;
    state.errMsg = errMsg;
    localStorage.setItem("authUser", JSON.stringify(user));
  },
  UPDATE_USER: (state, { user, index }) => {
    state.users[index] = user;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
