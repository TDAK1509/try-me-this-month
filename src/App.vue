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

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ul,
ol,
li {
  list-style: none;
}

.app {
  font-family: Arial, sans-serif;
}
</style>
