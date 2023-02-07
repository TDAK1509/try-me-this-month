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
  const subData: Ref<SubsData | null> = ref(null);
  const selectedPrice: Ref<Price> = ref("");
  const favorites: Ref<string[]> = ref([]);

  function setSelectedPrice(newPrice: Price) {
    selectedPrice.value = newPrice;
  }

  async function fetch() {
    subData.value = await db.fetch();
  }

  async function add(subName: SubName, price: Price, link: Link) {
    return db.add(subName, price, link);
  }

  async function remove(subName: SubName, price: Price, link: Link) {
    return db.remove(subName, price, link);
  }

  const priceList: ComputedRef<Price[]> = computed(() =>
    extractCategoriesFromApiResponse(subData.value)
  );

  const selectedPriceLinks: ComputedRef<SubsDataByPrice> = computed(() => {
    let links: SubsDataByPrice = {};

    for (const subName in subData.value) {
      links[subName] = subData.value[subName][selectedPrice.value];
    }

    return links;
  });

  const subList: ComputedRef<SubName[]> = computed(() =>
    subData.value ? Object.keys(subData.value) : []
  );

  async function fetchFavorites() {
    favorites.value = await db.fetchFavorites();
  }

  async function addFavorite(link: Link) {
    return db.addFavorite(link);
  }

  async function removeFavorite(link: Link) {
    return db.removeFavorite(link);
  }

  return {
    subData,
    selectedPrice,
    selectedPriceLinks,
    subList,
    priceList,
    favorites,
    fetch,
    fetchFavorites,
    add,
    addFavorite,
    removeFavorite,
    remove,
    setSelectedPrice,
  };
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
