<script>
export default {
  data() {
    return {
      post: {},
      postAuthor: {},
    };
  },
  mounted() {
    this.getPost();
  },
  methods: {
    getPost() {
      const postsList = JSON.parse(localStorage.getItem("postsList")) || [];
      const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
      const slug = this.$route.params.slug;
      let postObj;
      if (postsList.length > 0) {
        const post = postsList.filter((post) => post.slug === slug);
        if (post.length > 0) {
          this.post = post[0];
          postObj = post[0];
        }
      }

      //   get the author of the post by email
      usersList.filter((user) => {
        // console.log(user);
        // console.log(postObj);
        if (user.email === postObj.authorEmail) {
          this.postAuthor = user;
        }
      });
    },
  },
};
</script>

<template>
  <div class="flex flex-col-reverse md:flex-row">
    <div class="md:fixed m-auto">
      <div class="p-5 shadow-md w-fit h-fit bg-slate-50 mt-10 mx-20">
        <img
          :src="postAuthor.image"
          :alt="postAuthor.name"
          class="inline-block h-40 w-40 rounded-full ring-2 ring-white mr-5"
        />
        <h2 class="font-bold text-lg">{{ postAuthor.name }}</h2>
        <p class="text-base text-gray-600">{{ postAuthor.email }}</p>
        <p class="text-base text-gray-600">{{ postAuthor.address }}</p>
      </div>
      <!-- <div class="w-fit bg-slate-50 rounded-sm shadow-md mt-10 p-5">
        <span class="font-semibold">This is Advertisement</span>
        <p class="text-sm w-72">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat, ex.
        </p>
      </div> -->
    </div>
    <div class="p-5 md:p-10 w-full md:w-2/3 flex-3 md:m-auto md:ml-80">
      <img :src="post.image" alt="post" srcset="" class="m-auto w-full h-1/4" />
      <h2 class="font-bold text-2xl mt-5">{{ post.title }}</h2>
      <div class="mb-5">
        <span> By </span>
        <span class="text-gray-400">
          {{ post.authorEmail }}
        </span>
        <span> at </span>
        <span class="text-gray-400">
          {{ post.publishedAt }}
        </span>
      </div>
      <div v-html="post.body"></div>
    </div>
  </div>
</template>
