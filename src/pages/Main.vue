<template>
  <div class="flex flex-col md:flex-row">
    <div
      class="flex-1 bg-gray-200 flex py-5 md:px-2 lg:px-5 xl:px-10 flex-col h-full md:h-screen overflow-scroll"
    >
      <top-bar></top-bar>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        <post-card
          v-for="post in allPosts"
          v-if="allPosts.length > 0"
          :key="post.slug"
          :post="post"
          @delete="handleRemovePost"
          @edit="handleEditPost"
        ></post-card>
      </div>
    </div>

    <div class="flex-1 h-full 2xl:h-screen">
      <!-- a loop for the usersList -->
      <div class="flex flex-wrap">
        <div
          v-if="this.$route.query.search"
          class="py-2 px-4 bg-slate-600 text-gray-100 rounded-full w-fit mx-2 my-2"
        >
          <span class="text-sm"> {{ this.$route.query.search }}</span>
          <span
            class="text-xs ml-2 hover:text-base cursor-pointer"
            @click="handleBadgeRemove('search')"
            >X</span
          >
        </div>
        <div
          v-if="this.$route.query.age"
          class="py-2 px-4 bg-slate-600 text-gray-100 rounded-full w-fit mx-2 my-2"
        >
          <span class="text-sm"> {{ this.$route.query.age }}</span>
          <span
            class="text-xs ml-2 hover:text-base cursor-pointer"
            @click="handleBadgeRemove('age')"
            >X</span
          >
        </div>
      </div>
      <user-card
        v-for="(user, index) in allUsers"
        v-if="allUsers.length > 0"
        :key="user.email"
        :user="{ ...user, index: index + 1 }"
        @edit="handleEditUser"
      ></user-card>

      <div v-else class="flex flex-1 flex-col justify-center items-center m-10">
        <vue-feather
          type="alert-triangle"
          class="p-5 bg-orange-100 rounded-full"
        ></vue-feather>
        <!-- <h2 class="font-bold text-yellow-700">No Users found!!!</h2> -->
      </div>
    </div>
  </div>
</template>
<script>
import UserCard from "../components/UserCard.vue";
import PostCard from "../components/PostCard.vue";
import TopBar from "../components/TopBar.vue";
import { mapGetters } from "vuex";

export default {
  components: { UserCard, PostCard, TopBar },
  mounted() {},
  data() {
    return {
      user: {
        name: "",
        email: "",
        age: "",
        address: "",
        image: "",
      },
    };
  },
  computed: mapGetters(["allPosts", "allUsers"]),
  methods: {
    handleEditUser(user) {
      this.$router.push({
        name: "newuser", //use name for router push
        params: user,
      });
    },
    handleRemovePost(slug) {
      console.log("remove", slug);
      this.postsList = this.postsList.filter((post) => post.slug != slug);
      localStorage.setItem("postsList", JSON.stringify(this.postsList));
    },
    handleEditPost(post) {
      console.log("edit", post.slug);
      this.$router.push({
        name: "newpost", //use name for router push
        params: post,
      });
    },

    handleBadgeRemove(key) {
      console.log(key);
      let query = Object.assign({}, this.$route.query);
      delete query[key];
      console.log(query);
      this.$router.replace({ query });
      // this.usersList = this.handleInitialData();
      // this.$route.query.key = "";
    },
  },
};
</script>
