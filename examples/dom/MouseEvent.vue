<template>
  <div class="min-h-screen overflow-hidden bg-gray-300">
    <div class="m-5 h-[1000px] w-[300px] bg-orange-500" @mousedown="handle"> </div>
  </div>
</template>

<script lang="ts" setup>
  const handle = (event: MouseEvent) => {
    console.log('event', event);
  };
</script>

<style scoped></style>
