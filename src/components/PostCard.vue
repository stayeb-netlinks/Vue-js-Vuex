<script setup>
// import { ref } from "vue";

defineProps({
  post: Object,
});

// const count = ref(0);
</script>

<template>
  <!-- 1 -->
  <div class="bg-gray-100 mb-2 shadow-sm w-full rounded-md">
    <router-link :to="`/post/${post.slug}`">
      <img
        :src="post.image"
        alt="placeholder"
        srcset=""
        class="inline-block w-full rounded-md"
      />
    </router-link>

    <p class="font-bold text-base ml-2 mt-2">{{ post.title }}</p>
    <p class="font-normal text-xs ml-2 mt-1">{{ post.publishedAt }}</p>

    <div class="mb-2 mt-2 ml-2">
      <vue-feather
        type="edit"
        class="mr-5 cursor-pointer text-gray-600 hover:text-blue-500"
        @click="$emit('edit', post)"
      ></vue-feather>
      <vue-feather
        type="delete"
        class="cursor-pointer text-gray-600 hover:text-red-500"
        @click="$emit('delete', post.slug)"
      ></vue-feather>
    </div>
  </div>
</template>
