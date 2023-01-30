<template>
  <div class="flex flex-col h-full">
    <HomeNav />
    <HomeMain class="flex-1" />
    <HomeFooter />
  </div>
</template>

<script setup lang="ts">
import HomeNav from "@/components/HomeNav.vue";
import HomeMain from "@/components/HomeMain.vue";
import HomeFooter from "@/components/HomeFooter.vue";
</script>
