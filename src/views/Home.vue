<template>
  <div class="space-y-4" :class="prefixCls">
    <div class="flex p-[40px]">
      <div class="h-[2000px] overflow-auto" ref="divRef">111</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  import { ref } from 'vue';

  defineOptions({ name: 'Home' });

  const { prefixCls } = useDesign('home-page');

  const divRef = ref<HTMLDivElement | null>(null);
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-home-page';

  .@{prefix-cls} {
    width: 100%;
    min-height: 100vh;
  }
</style>
