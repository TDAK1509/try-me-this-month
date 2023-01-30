<template>
  <nav class="nav">
    <ul class="flex text-center">
      <li class="flex-1" v-for="category in categories" :key="category">
        <button
          class="w-full py-3 bg-gray-200"
          :class="{ 'bg-gray-900 text-white': category === '2tr5' }"
        >
          {{ category }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const categories = ["This month", "2tr5", "3tr5"];
</script>
