import { computed, ref } from "vue";
import { createGlobalState } from "@vueuse/core";
import type { Ref, ComputedRef } from "vue";
import { Db, Link, Price, SubName, SubsData } from "@/types/data.types";
import { db } from "@/plugins/firestore";

export const useSub = createGlobalState(() => {
  const data: Ref<SubsData | null> = ref(null);

  async function fetch() {
    data.value = await db.fetch();
  }

  async function add(subName: SubName, price: Price, link: Link) {
    return db.add(subName, price, link);
  }

  const priceList: ComputedRef<Price[]> = computed(() =>
    extractCategoriesFromApiResponse(data.value)
  );

  return { priceList, fetch, add };
});

function extractCategoriesFromApiResponse(response: SubsData | null): Price[] {
  if (response === null) return [];

  const _categories: Price[] = [];

  for (const sub in response) {
    const pricesInThisSub: Price[] = Object.keys(response[sub]);
    _categories.push(...pricesInThisSub);
  }

  return [...new Set(_categories)].sort();
}
