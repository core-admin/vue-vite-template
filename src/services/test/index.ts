import { defaultRequest as request } from '@/utils/request/default-request';

export function testApi() {
  return request.post({
    url: '/boot2/getPresignedUrl4DownloadList',
    data: {
      fileList: [
        {
          fileName: 'test011002.jpg',
          fileUrl: 'c0c7e92272c64639bb7e2102161d777d.jpg',
        },
        {
          fileName: 'test011003.jpg',
          fileUrl: '0fa8635173a541bdbafc52ef3d193966.jpg',
        },
      ],
      expiryTime: 300,
    },
  });
}
