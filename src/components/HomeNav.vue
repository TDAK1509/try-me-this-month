<template>
  <nav class="nav">
    <ul class="flex text-center overflow-x-auto">
      <li
        class="basis-28 shrink-0"
        v-for="category in priceList"
        :key="category"
      >
        <button
          class="w-full py-3 bg-gray-200"
          :class="{ 'bg-gray-900 text-white': category === selectedPrice }"
          :disabled="category === selectedPrice"
          @click="setSelectedPrice(category)"
        >
          {{ category }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useSub } from "@/store/sub";

const { selectedPrice, priceList, setSelectedPrice } = useSub();

onMounted(() => {
  setSelectedPrice(priceList.value.length > 0 ? priceList.value[0] : "");
});
</script>
