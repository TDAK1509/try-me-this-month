<template>
  <nav class="nav">
    <ul class="flex text-center">
      <li class="flex-1" v-for="category in categories" :key="category">
        <button
          class="w-full py-3 bg-gray-200"
          :class="{ 'bg-gray-900 text-white': category === currentCategory }"
          :disabled="category === currentCategory"
          @click="currentCategory = category"
        >
          {{ category }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject } from "vue";
import { Db, Price, SubsData } from "@/types/data.types";

const db: Db = inject("firebase") as Db;

onMounted(async () => {
  const l = await db.fetch();
  console.log(extractCategoriesFromApiResponse(l));
});

function extractCategoriesFromApiResponse(response: SubsData): Price[] {
  const _categories: Price[] = [];

  for (const sub in response) {
    const pricesInThisSub: Price[] = Object.keys(response[sub]);
    _categories.push(...pricesInThisSub);
  }

  return [...new Set(_categories)].sort();
}

const categories = ["This month", "2tr5", "3tr5"];
const currentCategory = ref("2tr5");
</script>
