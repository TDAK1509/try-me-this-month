import { computed, ref } from "vue";
import { createGlobalState } from "@vueuse/core";
import type { Ref, ComputedRef } from "vue";
import {
  Link,
  Price,
  SubName,
  SubsData,
  SubsDataByPrice,
} from "@/types/data.types";
import { db } from "@/db/firestore";

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

  function getLinksByPrice(price: Price): SubsDataByPrice {
    let links: SubsDataByPrice = {};

    for (const subName in data.value) {
      links[subName] = data.value[subName][price];
    }

    return links;
  }

  return { getLinksByPrice, priceList, fetch, add };
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
