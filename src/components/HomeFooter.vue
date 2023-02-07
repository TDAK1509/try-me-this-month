<template>
  <footer class="flex flex-col fixed bottom-6 right-6">
    <HeartButton />

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
