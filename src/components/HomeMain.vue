<template>
  <main class="p-4">
    <template v-for="(links, subName) in selectedPriceLinks">
      <h4 class="font-bold mt-4 first:mt-0">{{ subName }}</h4>
      <ul class="list-disc text-blue-500">
        <li v-for="link in links" class="ml-4 my-2">
          <a href="link" target="_blank" class="underline">{{ link }}</a>
          <button
            class="ml-4 rotate-45 text-gray-700 text-2xl relative top-0.5 cursor-pointer"
            @click="removeLink(subName, link)"
          >
            +
          </button>
        </li>
      </ul>
    </template>
  </main>
</template>

<script lang="ts" setup>
import { useSub } from "@/store/sub";
import { Link, SubName } from "@/types/data.types";

const { selectedPrice, selectedPriceLinks, remove, fetch } = useSub();

async function removeLink(subName: SubName, link: Link) {
  try {
    await remove(subName, selectedPrice.value, link);
    await fetch();
  } catch (e: unknown) {
    if (e instanceof Error) alert(e.message);
    alert(e);
  }
}
</script>
