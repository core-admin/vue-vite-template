<template>
  <div class="space-y-4">
    <tj-button @click="getObsAccess">获取obs秘钥</tj-button>
    <tj-upload :request-method="uploadFile">
      <tj-button>单个上传测试</tj-button>
    </tj-upload>
    <input type="file" multiple ref="multipleFileRef" hidden @input="handleMultipleUpload" />
    <tj-button @click="handleMultipleFile">多个上传测试（并发上传）</tj-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { getObsAccessApi } from '@/services/common/obs';
  import { getEnv } from '@/utils/env';
  import { UploadFile, RequestMethodResponse } from 'tj-design-vue';
  import { uploadObsFile, optimizeUploadFiles } from '@/utils/obs/direct-upload';

  const { VITE_OBS_DEFAULT_BUCKET_NAME } = getEnv();

  function getObsAccess() {
    getObsAccessApi({
      bucketName: VITE_OBS_DEFAULT_BUCKET_NAME,
      dir: '/test',
    }).then(res => {
      console.log(res);
    });
  }

  function uploadFile(file: UploadFile) {
    return uploadObsFile({ file: file.raw! })
      .then<RequestMethodResponse>(res => {
        console.log(res.obsAccessUrl);
        return {
          status: 'success',
          response: {
            url: res.obsAccessUrl,
          },
        };
      })
      .catch<RequestMethodResponse>(() => {
        return {
          status: 'fail',
          error: '上传失败',
          response: {},
        };
      });
  }

  const multipleFileRef = ref<ElRef<HTMLInputElement>>(null);

  function handleMultipleFile() {
    multipleFileRef.value?.click();
  }

  function handleMultipleUpload(e: Event) {
    const files = (e.target as HTMLInputElement).files!;
    console.time('上传耗时');
    optimizeUploadFiles({ files: [...files] }).then(res => {
      console.timeEnd('上传耗时');
      console.log(res);
    });
  }
</script>
