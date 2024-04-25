<template>
  <div class="p-4">
    <div class="flex items-center gap-4 rounded-xl p-4 shadow-xl">
      <TjUpload :request-method="handleUpload" theme="custom">
        <TjButton theme="primary">上传文件</TjButton>
      </TjUpload>
    </div>
  </div>
</template>

<script lang="ts" setup>
  /**
   * 测试：右后端构造上传obs文件的请求地址，不再由前端根据华为云绝对地址、桶名、获取键名秘钥信息等参数构造生成上传地址
   */
  import { TjButton, TjUpload, UploadFile, RequestMethodResponse } from 'tj-design-vue';
  import { initialUploadObsFile } from '@/utils/obs/new-direct-upload';

  async function handleUpload(ev: UploadFile): Promise<RequestMethodResponse> {
    const file = ev.raw!;

    const uploadObsFile = initialUploadObsFile('/user/obs_signature');

    // 默认上传
    // const { url } = await uploadObsFile(file);

    // 增加随机文件名
    // const { url } = await uploadObsFile(file, true);

    // 修改文件名，（下载文件时，将使用重命名的名称）
    const { url, fileName, rename, signatureData } = await uploadObsFile(file, '测试文件aaa');

    console.log({
      // 上传完毕后，生成的可用于后端存储的url地址（obs资源地址）
      url,
      // 文件名
      fileName,
      // 重命名后的文件名，如果不需要重命名，则不存在
      rename,
      // 上传文件时，后端返回的签名信息，基于该签名信息，完成文件上传
      signatureData,
    });

    return Promise.resolve({
      status: 'success',
      response: {
        url,
      },
    });
  }
</script>
