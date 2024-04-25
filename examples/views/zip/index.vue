<template>
  <div>
    <tj-button :loading="downloadLoading" @click="handleZip">Zip Download</tj-button>
  </div>
</template>

<script lang="ts" setup>
  /**
   * 博客：https://juejin.cn/post/7170221606415892511?searchId=20240319162316EFA611FF287F24ACDC9B
   */
  import { ref } from 'vue';
  import { nanoid } from 'nanoid';
  import { chunk } from 'lodash-es';
  import JSZip from 'jszip';
  import { saveAs } from 'file-saver';

  defineOptions({ name: 'Zip' });

  const downloadLoading = ref(false);
  const zip = new JSZip();

  const mockData = () => {
    const data = Array.from({ length: 10000 }).map(() => {
      return {
        id: nanoid(),
        name: 'John Doe',
        age: 30,
        email: 'xxxxxx123@jj.com',
        address: 'New York No. 1 Lake Park',
      };
    });
    return chunk(data, data.length / 10);
  };

  const handleZip = () => {
    downloadLoading.value = true;
    const data = mockData();

    data.forEach((jsonData, index) => {
      const jsonText = JSON.stringify(jsonData, null, 2);
      /**
       * 1. 将数据转为 json 字符串；
       * 2. 使用 zip.file 创建要放入的文件及其内容
       */
      zip.file(`${index + 1}-data.json`, jsonText);
    });

    /**
     * 生成文件（以Blob形式）
     */
    zip
      .generateAsync({ type: 'blob' })
      .then(content => {
        /**
         * 在回调中拿到 zip 文件的文件流，使用 file-saver 进行下载
         */
        saveAs(content, 'json.zip');
      })
      .catch(error => {
        // 处理任何在生成或下载zip文件过程中出现的错误
        console.error('Error generating zip:', error);
      })
      .finally(() => {
        downloadLoading.value = false;
      });
  };
</script>

<style scoped></style>
