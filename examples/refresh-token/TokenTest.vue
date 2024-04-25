<template>
  <StyleProvider hash-priority="high">
    <div class="space-y-5">
      <Button type="primary" @click="$router.push('/login')">返回</Button>
      <h1 class="text-3xl">{{ res1 }}</h1>
      <h1 class="text-3xl">{{ res2 }}</h1>
    </div>
  </StyleProvider>
</template>

<script lang="ts" setup>
  import { noAuthTestApi, needAuthTestApi } from '../../src/services/user';
  import { ref } from 'vue';
  import { Message } from '../../src/hooks/web/useMessage';
  import { Button } from 'ant-design-vue';
  import { StyleProvider } from 'ant-design-vue/es/_util/cssinjs';

  const res1 = ref('');
  const res2 = ref('');

  noAuthTestApi().then(res => {
    res1.value = res;
  });

  needAuthTestApi('11111111')
    .then(res => {
      res2.value = res;
    })
    .catch(() => {
      Message.error('TokenTest 页面 needAuthTestApi 请求失败');
    });

  Promise.all([
    needAuthTestApi('22222222222').catch(() =>
      Message.error('TokenTest 页面 needAuthTestApi 请求失败 A1'),
    ),
    needAuthTestApi('333333333333').catch(() =>
      Message.error('TokenTest 页面 needAuthTestApi 请求失败 A2'),
    ),
  ]);
</script>
