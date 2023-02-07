<template>
  <div
    v-if="loading"
    class="w-screen h-screen flex justify-center items-center"
  >
    <Loader class="w-24 h-24" />
  </div>

  <div v-else class="p-4">
    <nav class="flex gap-4">
      <RouterLink
        class="flex justify-center items-center font-bold mb-4 bg-black text-white rounded p-2 w-24"
        to="/"
      >
        Go back
      </RouterLink>

      <button
        class="flex justify-center items-center font-bold mb-4 bg-black text-white rounded p-2 w-24"
        @click="copy"
      >
        Copy
      </button>
    </nav>

    <ul class="ml-4 list-disc">
      <li v-for="link in favorites" :key="link" class="mb-2">
        <a :href="link" target="_blank" class="underline text-blue-500">{{
          link
        }}</a>

        <button
          class="w-3 h-3 ml-4 cursor-pointer"
          :disabled="isRemovingFavorite"
          @click="onClickHeartButton(link)"
        >
          <Loader
            v-if="isRemovingFavorite && link === linkBeingRemoved"
            class="w-3 h-3"
          />
          <HeartButton v-else />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Loader from "@/components/Loader.vue";
import HeartButton from "@/components/HeartButton.vue";
import { useSub } from "@/store/sub";

const { favorites, fetchFavorites, removeFavorite } = useSub();

const loading = ref(true);
const isRemovingFavorite = ref(false);
const linkBeingRemoved = ref("");

onMounted(async () => {
  await fetchFavorites();
  loading.value = false;
});

function copy() {
  const text = favorites.value.join("\n\n");
  copyToClipboard(text);
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

async function onClickHeartButton(link: string) {
  try {
    isRemovingFavorite.value = true;
    linkBeingRemoved.value = link;
    await removeFavorite(link);
    await fetchFavorites();
  } catch (e: unknown) {
    if (e instanceof Error) alert(e.message);
    alert(e);
  } finally {
    isRemovingFavorite.value = false;
    linkBeingRemoved.value = "";
  }
}
</script>
