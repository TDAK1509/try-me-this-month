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
import { ref } from "vue";

const categories = ["This month", "2tr5", "3tr5"];
const currentCategory = ref("2tr5");
</script>
