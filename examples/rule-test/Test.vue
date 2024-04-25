<template>
  <div>
    <ElInput />
    <NCountdown />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { ElInput } from 'element-plus';
  import { NCountdown } from 'naive-ui';

  const emit = defineEmits<{
    foo: [bar: string];
    baz: [];
    textChange: [text: string];
    'test-event': [text: string];
  }>();

  onMounted(() => {
    emit('textChange', 'hello');
  });
</script>
