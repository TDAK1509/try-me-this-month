<template>
  <div class="flex justify-center items-center h-screen p-14 text-lg">
    <form @submit.prevent="submit">
      <label>
        Sub: <br />
        <input v-model="sub" type="text" :class="inputClasses" />
      </label>

      <label class="block mt-4">
        Price: <br />
        <input v-model="price" type="text" :class="inputClasses" />
      </label>

      <label class="block mt-4">
        Link: <br />
        <input v-model="link" type="text" :class="inputClasses" />
      </label>

      <button
        class="bg-black text-white px-6 py-2 rounded mt-6 w-full cursor-pointer"
      >
        <Loader v-if="loading" />
        <span v-else>Add</span>
      </button>

      <p v-if="shouldShowSuccessMessage" class="text-lime-500 text-xs mt-3">
        Successfully added.
      </p>

      <RouterLink class="block mt-4 italic text-base" type="button" to="/">
        &lt; Back
      </RouterLink>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Loader from "@/components/Loader.vue";
import { useSub } from "@/store/sub";

const { add } = useSub();

const inputClasses = "border border-gray-400 rounded px-2 py-1";

const sub = ref("");
const price = ref("");
const link = ref("");

const loading = ref(false);
const shouldShowSuccessMessage = ref(false);

async function submit() {
  try {
    loading.value = true;
    shouldShowSuccessMessage.value = false;
    await add(sub.value, price.value, link.value);
    shouldShowSuccessMessage.value = true;
  } catch (e) {
    console.error("Error adding document: ", e);
  } finally {
    loading.value = false;
  }
}
</script>
