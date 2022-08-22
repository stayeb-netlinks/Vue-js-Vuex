<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.fetchUsers();
    this.fetchPosts();
    this.fetchAuthUser();
  },
  methods: {
    ...mapActions(["fetchUsers", "fetchPosts", "fetchAuthUser"]),
  },
};
</script>

<template>
  <router-view> </router-view>
</template>
