<template>
  <div>
    <Test :on-text-change="aaa" />
    <Spin />
  </div>
</template>

<script lang="ts" setup>
  import Test from './Test.vue';
  import Spin from './Spin';

  function aaa() {}
</script>
