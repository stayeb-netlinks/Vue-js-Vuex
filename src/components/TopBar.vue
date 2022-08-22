<template lang="">
  <div class="flex justify-between mx-5 items-center mb-10">
    <div class="flex items-center" @click="this.$router.push('/')">
      <img
        :src="authUser?.image"
        :alt="authUser?.name"
        class="inline-block h-8 w-8 rounded-full ring-2 ring-white mr-5"
      />
      <h1 class="font-bold uppercase tracking-widest text-xl md:text-2xl">
        {{ authUser?.name }}
      </h1>
    </div>
    <div class="flex items-center">
      <button
        class="border-gray-600 px-2 rounded-md text-green-800 font-semibold hover:font-bold text-sm md:text-base"
        @click="this.$router.push('/')"
        v-if="this.$route.name !== 'home'"
      >
        Home
      </button>
      <button
        class="border-gray-600 px-2 rounded-md text-green-800 font-semibold hover:font-bold text-sm md:text-base"
        @click="this.$router.push('/new-post')"
        v-if="this.$route.name !== 'newpost'"
      >
        Create Post
      </button>
      <button
        class="border-gray-600 px-2 rounded-md text-green-800 font-semibold hover:font-bold text-sm md:text-base"
        @click="this.$router.push('/new-user')"
        v-if="this.$route.name !== 'newuser'"
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
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  mounted() {},
  computed: mapGetters(["authUser"]),
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>
