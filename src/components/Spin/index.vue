<template>
  <div class="custom_spin"></div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  defineOptions({ name: 'Spin' });

  const props = defineProps({
    size: {
      type: Number as PropType<number>,
      default: 54,
    },
    color: {
      type: String as PropType<string>,
      default: 'var(--primary-color, #306eff)',
    },
  });

  const style = computed(() => ({
    width: `${props.size}px`,
    height: `${props.size}px`,
    color: props.color,
  }));
</script>

<style>
  .custom_spin {
    width: v-bind('style.width');
    height: v-bind('style.height');
    /* background: royalblue;
    -webkit-mask:
      radial-gradient(closest-side circle, royalblue 99%, transparent 100%) center top/25% 25%
        no-repeat,
      radial-gradient(closest-side circle, transparent 49%, red 50% 99%, transparent 100%),
      conic-gradient(transparent 10%, royalblue 90%);
    -webkit-mask-composite: source-over, source-in; */

    background: v-bind('style.color');
    mask:
      radial-gradient(closest-side circle, v-bind('style.color') 99%, transparent 101%) center top/
        12% 12% no-repeat,
      radial-gradient(closest-side circle, transparent 76%, red 77% 99%, transparent 100%),
      conic-gradient(transparent 4%, v-bind('style.color') 90%);
    webkit-mask:
      radial-gradient(closest-side circle, v-bind('style.color') 99%, transparent 101%) center top/
        12% 12% no-repeat,
      radial-gradient(closest-side circle, transparent 76%, red 77% 99%, transparent 100%),
      conic-gradient(transparent 4%, v-bind('style.color') 90%);
    mask-composite: source-over, source-in;
    -webkit-mask-composite: source-over, source-in;
    animation: custom_spin_rotate 1s linear infinite;
  }

  @keyframes custom_spin_rotate {
    to {
      transform: rotate(360deg);
    }
  }
</style>
