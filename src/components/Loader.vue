<template>
  <div class="loader w-5 h-5 border-2 border-transparent border-t-black"></div>
</template>

<style coped>
.loader {
  display: inline-block;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
