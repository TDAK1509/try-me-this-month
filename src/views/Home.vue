<template>
  <div v-if="!loaded">Loading...</div>

  <div v-else class="flex flex-col h-full">
    <HomeNav />
    <HomeMain class="flex-1" />
    <HomeFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import HomeNav from "@/components/HomeNav.vue";
import HomeMain from "@/components/HomeMain.vue";
import HomeFooter from "@/components/HomeFooter.vue";

import { useSub } from "@/store/sub";

const { fetch } = useSub();
const loaded = ref(false);

onMounted(async () => {
  await fetch();
  loaded.value = true;
});
</script>
