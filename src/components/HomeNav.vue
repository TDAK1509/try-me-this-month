<template>
  <nav class="nav">
    <ul class="flex text-center">
      <li class="flex-1" v-for="category in priceList" :key="category">
        <button
          class="w-full py-3 bg-gray-200"
          :class="{ 'bg-gray-900 text-white': category === selectedPrice }"
          :disabled="category === selectedPrice"
          @click="selectedPrice = category"
        >
          {{ category }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import { Price } from "@/types/data.types";
import { useSub } from "@/store/sub";

const { priceList } = useSub();

const selectedPrice: Ref<Price> = ref(
  priceList.value.length > 0 ? priceList.value[0] : ""
);
</script>
