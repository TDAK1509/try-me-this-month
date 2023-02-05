<template>
  <main class="p-4">
    <template v-for="(links, subName) in selectedPriceLinks">
      <h4 class="font-bold mt-4 first:mt-0">{{ subName }}</h4>
      <ul class="list-disc text-blue-500">
        <TransitionGroup name="list">
          <li v-for="link in links" :key="link" class="ml-4 my-2">
            <a href="link" target="_blank" class="underline">{{ link }}</a>
            <button
              class="ml-4 rotate-45 text-gray-700 text-2xl relative top-0.5 cursor-pointer"
              :disabled="isDeleting"
              @click="removeLink(subName, link)"
            >
              <Loader v-if="isDeleting && link === linkBeingDeleted" />
              <span v-else>+</span>
            </button>
          </li>
        </TransitionGroup>
      </ul>
    </template>
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useSub } from "@/store/sub";
import { Link, SubName } from "@/types/data.types";
import Loader from "./Loader.vue";

const { subData, selectedPrice, selectedPriceLinks, remove, fetch } = useSub();
const isDeleting = ref(false);
const linkBeingDeleted = ref("");

async function removeLink(subName: SubName, link: Link) {
  try {
    isDeleting.value = true;
    linkBeingDeleted.value = link;
    await remove(subName, selectedPrice.value, link);
    removeLinkInUi(subName, link);
  } catch (e: unknown) {
    if (e instanceof Error) alert(e.message);
    alert(e);
  } finally {
    isDeleting.value = false;
    linkBeingDeleted.value = "";
  }
}

function removeLinkInUi(subName: SubName, link: Link) {
  // @ts-ignore
  subData.value[subName][selectedPrice.value] = subData.value[subName][
    selectedPrice.value
  ].filter((l: Link) => l !== link);
}
</script>
