<template>
  <div class="flex flex-col h-screen">
    <AppNav />
    <AppMain class="flex-1" />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNav from "@/components/AppNav.vue";
import AppMain from "@/components/AppMain.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>
