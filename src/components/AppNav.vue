<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__list-item" v-for="category in categories" :key="category">
        {{ category }}
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const categories = ["This month", "2tr5", "3tr5"];
</script>

<style scoped>
.nav {
  width: 80vw;
  overflow-x: auto;
}

.nav__list {
  display: flex;
  justify-content: center;
  list-style: none;
}
</style>
