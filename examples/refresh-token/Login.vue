<template>
  <StyleProvider hash-priority="high">
    <div class="flex h-screen w-screen items-center justify-center bg-sky-200">
      <div class="w-[300px] space-y-4 rounded-xl bg-white p-5 shadow-2xl">
        <Input placeholder="请输入账号" v-model:value="formData.username" />
        <Input placeholder="请输入密码" v-model:value="formData.password" />
        <Button class="w-full" type="primary" :loading="formData.loading" @click="submit">
          登录
        </Button>
        <Button class="w-full" type="primary" @click="$router.push('/token-test')">
          进入 TokenTest 页面
        </Button>
      </div>
    </div>
  </StyleProvider>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { Input, Button } from 'ant-design-vue';
  import { StyleProvider } from 'ant-design-vue/es/_util/cssinjs';
  import { loginApi } from '../../src/services/user/index';
  import { useUserStore } from '@/store/user';
  import { useRouter } from 'vue-router';

  const formData = reactive({
    username: '',
    password: '',
    loading: false,
  });
  const userStore = useUserStore();
  const router = useRouter();

  function submit() {
    loginApi(formData)
      .then(({ accessToken, refreshToken }) => {
        userStore.setTokenInfoAction({ access_token: accessToken, refresh_token: refreshToken });
        router.replace('/token-test');
      })
      .finally(() => {
        formData.loading = false;
      });
  }
</script>
