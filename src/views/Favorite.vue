<template>
  <div
    v-if="loading"
    class="w-screen h-screen flex justify-center items-center"
  >
    <Loader class="w-24 h-24" />
  </div>

  <div v-else>
    <ul>
      <li v-for="favorite in favorites" :key="favorite">{{ favorite }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Loader from "@/components/Loader.vue";
import { useSub } from "@/store/sub";

const { favorites, fetchFavorites } = useSub();

const loading = ref(true);

onMounted(async () => {
  await fetchFavorites();
  loading.value = false;
});
</script>
