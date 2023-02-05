<template>
  <div class="flex justify-center items-center h-screen p-14 text-lg">
    <form @submit.prevent="submit">
      <label>
        Sub: <br />
        <input v-model="sub" list="subs" type="text" :class="inputClasses" />
      </label>
      <datalist id="subs">
        <option v-for="s in subList" :key="s" :value="s"></option>
      </datalist>

      <label class="block mt-4">
        Price: <br />
        <input
          v-model="price"
          list="prices"
          type="text"
          :class="inputClasses"
        />
      </label>
      <datalist id="prices">
        <option v-for="p in priceList" :key="p" :value="p"></option>
      </datalist>

      <label class="block mt-4 relative">
        Link: <br />

        <input v-model="link" type="text" :class="inputClasses" />
        <button
          type="button"
          class="ml-2 rotate-45 text-gray-700 text-2xl absolute bottom-0.5 cursor-pointer"
          @click="clearLink"
        >
          +
        </button>
      </label>

      <button
        class="bg-black text-white px-6 py-2 rounded mt-6 w-full cursor-pointer"
        :disabled="isAdding"
      >
        <Loader v-if="isAdding" class="border-t-white" />
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
import { ref, onMounted } from "vue";
import Loader from "@/components/Loader.vue";
import { useSub } from "@/store/sub";

const { subData, subList, priceList, add, fetch } = useSub();

const inputClasses = "border border-gray-400 rounded px-2 py-1";

const sub = ref("");
const price = ref("");
const link = ref("");

const loading = ref(true);
const isAdding = ref(false);
const shouldShowSuccessMessage = ref(false);

onMounted(async () => {
  if (subData.value === null) {
    await fetch();
  }
  loading.value = false;
});

async function submit() {
  try {
    isAdding.value = true;
    shouldShowSuccessMessage.value = false;
    await add(sub.value, price.value, link.value);
    shouldShowSuccessMessage.value = true;
  } catch (e) {
    console.error("Error adding document: ", e);
  } finally {
    isAdding.value = false;
  }
}

function clearLink() {
  link.value = "";
  shouldShowSuccessMessage.value = false;
}
</script>
