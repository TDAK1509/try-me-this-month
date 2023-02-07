<template>
  <footer class="flex flex-col fixed bottom-12 right-6 gap-4">
    <RouterLink
      class="w-10 h-10 rounded-full bg-red-500 text-2xl flex justify-center items-center"
      to="favorite"
    >
      <HeartButton width="20px" height="20px" color="white" />
    </RouterLink>

    <RouterLink
      class="w-10 h-10 rounded-full bg-black text-2xl text-white text-center"
      to="add"
    >
      <span class="relative top-px">+</span>
    </RouterLink>
  </footer>
</template>

<script setup lang="ts">
import HeartButton from "./HeartButton.vue";
</script>
