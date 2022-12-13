<template>
  <div class="app">
    <AppNav />
    <AppMain />
  </div>
</template>

<script setup lang="ts">
import AppNav from "@/components/AppNav.vue";
import AppMain from "@/components/AppMain.vue";
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  font-family: Arial, sans-serif;
}
</style>
