<template>
  <div class="loader w-5 h-5 border-2"></div>
</template>

<style coped>
.loader {
  display: inline-block;
  border-color: transparent;
  border-top-color: #fff;
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
