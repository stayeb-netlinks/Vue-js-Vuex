<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.fetchUsers();
    this.fetchPosts();
  },
  methods: {
    ...mapActions(["fetchUsers", "fetchPosts"]),
  },
};
</script>

<template>
  <router-view> </router-view>
</template>
