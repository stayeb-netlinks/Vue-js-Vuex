<script setup>
// import { ref } from "vue";

defineProps({
  user: Object,
});

// const count = ref(0);
</script>

<template>
  <!-- 1 -->
  <div class="bg-gray-100 p-4 flex items-center mb-2 justify-between shadow-sm">
    <div class="flex items-center">
      <span class="font-bold text-gray-600 mr-5">{{ user.index }}</span>
      <img
        :src="user.image"
        alt="placeholder"
        srcset=""
        class="inline-block h-12 w-12 rounded-full ring-2 ring-white"
      />
      <div class="flex flex-col ml-5">
        <p class="font-bold text-lg">{{ user.name }}</p>
        <p class="font-normal text-sm">{{ user.email }}</p>
        <p
          class="font-normal text-sm"
          v-text="`${user.age} --- ${user.address}`"
        ></p>
      </div>
    </div>
    <div>
      <vue-feather
        type="edit"
        class="mr-5 cursor-pointer text-gray-600 hover:text-blue-500"
        @click="$emit('edit', user)"
      ></vue-feather>
      <vue-feather
        type="delete"
        class="cursor-pointer text-gray-600 hover:text-red-500"
        @click="$emit('delete', user.email)"
      ></vue-feather>
    </div>
  </div>
</template>
