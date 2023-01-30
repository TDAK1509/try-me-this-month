<template>
  <main class="p-4">
    <template v-for="(links, subName) in list">
      <h4 class="font-bold mt-4 first:mt-0">{{ subName }}</h4>
      <ul class="list-disc text-blue-500">
        <li v-for="link in links" class="ml-4 my-2">
          <a href="link" target="_blank" class="underline">{{ link }}</a>
          <button
            class="ml-4 rotate-45 text-gray-700 text-2xl relative top-0.5 cursor-pointer"
          >
            +
          </button>
        </li>
      </ul>
    </template>
  </main>
</template>

<script lang="ts" setup>
const list = {
  "Triệu Mẫn": ["link1", "link2", "link3"],
  Sun: ["link3", "link4"],
};
</script>
