import { computed, ref } from "vue";
import { createGlobalState } from "@vueuse/core";
import type { Ref, ComputedRef } from "vue";
import { Db, Price, SubsData } from "@/types/data.types";
import { db } from "@/plugins/firestore";

export const useSub = createGlobalState(() => {
  const data: Ref<SubsData | null> = ref(null);

  async function fetch() {
    data.value = await db.fetch();
  }

  const priceList: ComputedRef<Price[]> = computed(() =>
    extractCategoriesFromApiResponse(data.value)
  );

  return { priceList, fetch };
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
