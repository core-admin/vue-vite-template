<template>
  <div class="relative flex h-screen items-center bg-sky-400">
    <div class="ml-[100px] h-[200px] w-[200px] bg-purple-500">
      <div
        class="ml-[50px] mt-[50px] h-[20px] w-[20px] cursor-pointer rounded-full bg-red-500"
        @mousedown="onMouseDown"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const onMouseDown = (e: MouseEvent) => {
    console.log('onMouseDown', e);
  };
</script>
