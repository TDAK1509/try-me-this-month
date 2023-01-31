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
        Add
      </button>

      <RouterLink class="block mt-4 italic text-base" type="button" to="/">
        &lt; Back
      </RouterLink>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import { Db } from "@/types/data.types";

const db: Db = inject("firebase") as Db;
const inputClasses = "border border-gray-400 rounded px-2 py-1";

const sub = ref("");
const price = ref("");
const link = ref("");

async function submit() {
  console.log("submit", sub.value, price.value, link.value);

  try {
    const doc = {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    };
    const docRef = await db.add(doc);
    console.log("hoho", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
</script>
