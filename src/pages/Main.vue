<template>
  <div class="flex flex-col md:flex-row">
    <div
      class="flex-1 bg-gray-200 flex py-5 md:px-2 lg:px-5 xl:px-10 flex-col h-full md:h-screen overflow-hidden overflow-scroll"
    >
      <div class="flex justify-between mx-5 items-center mb-10">
        <div class="flex items-center">
          <img
            :src="authUser.image"
            :alt="authUser.name"
            class="inline-block h-8 w-8 rounded-full ring-2 ring-white mr-5"
          />
          <h1 class="font-bold uppercase tracking-widest text-xl md:text-2xl">
            {{ authUser.name }}
          </h1>
        </div>
        <div class="flex items-center">
          <button
            class="border-gray-600 px-2 rounded-md text-green-800 font-semibold hover:font-bold text-sm md:text-base"
            @click="this.$router.push('/new-post')"
          >
            Create Post
          </button>
          <button
            class="border-gray-600 px-2 rounded-md text-green-800 font-semibold hover:font-bold text-sm md:text-base"
            @click="this.$router.push('/new-user')"
          >
            Create User
          </button>
          <vue-feather
            type="log-out"
            class="border-[1.5px] border-gray-400 w-fit h-fit text-gray-500 p-2 rounded-full cursor-pointer hover:bg-gray-500 hover:text-white ml-2"
            @click="handleLogout"
            size="20"
          ></vue-feather>
        </div>
      </div>

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
        @delete="handleRemove"
        @edit="handleEdit"
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
import { mapGetters } from "vuex";

export default {
  components: { UserCard, PostCard },
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
  computed: mapGetters(["allPosts", "allUsers", "authUser"]),
  methods: {
    handleLogout() {
      localStorage.removeItem("authUser");
      this.$router.push("/login");
    },
    handleInitialData() {
      const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
      let filterResult;
      let { search, age } = this.$route.query;
      console.log(search, age);
      if (search && age) {
        console.log("1");
        let ageLimits = age.split("-");
        filterResult = usersList.filter(
          (user) =>
            user.name.toUpperCase() === search.toUpperCase() ||
            user.email.toUpperCase() === search.toUpperCase() ||
            (user.address.toUpperCase() === search.toUpperCase() &&
              user.age >= ageLimits[0] &&
              user.age <= ageLimits[1])
        );
      } else if (search && !age) {
        console.log("2");
        filterResult = usersList.filter(
          (user) =>
            user.name.toUpperCase() === search.toUpperCase() ||
            user.email.toUpperCase() === search.toUpperCase() ||
            user.address.toUpperCase() === search.toUpperCase()
        );
      } else if (age && !search) {
        console.log("3");
        let ageLimits = age.split("-");
        filterResult = usersList.filter(
          (user) => user.age >= ageLimits[0] && user.age <= ageLimits[1]
        );
      } else {
        console.log("4");
        filterResult = usersList;
      }
      //   console.log(filterResult);
      return filterResult;
    },
    handleSubmit() {
      // console.log(this.user);
      if (this.user.name && this.user.email && this.user.age) {
        const flag = this.usersList.filter((user, index) => {
          if (user.email === this.user.email) {
            return (this.usersList[index] = this.user);
          }
        });
        // console.log(flag);
        if (flag.length == 0) {
          // this.usersList.push(this.user);
          this.usersList = [...this.usersList, this.user];
        }
      }
      localStorage.setItem("usersList", JSON.stringify(this.usersList));
      this.handleReset();
    },
    handleReset() {
      this.user = {};
    },
    handleRemove(userEmail) {
      console.log("remove", userEmail);
      this.usersList = this.usersList.filter((user) => user.email != userEmail);
      localStorage.setItem("usersList", JSON.stringify(this.usersList));
    },
    handleEdit(slug) {
      this.user = user;
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
