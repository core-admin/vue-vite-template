import { getObsAccessApi as getObssecretInfo } from '@/services/common/obs';
import { getEnv } from '@/utils/env';

export function getObsDomainUrl(bucketName?: string) {
  if (!bucketName) {
    const { VITE_OBS_DEFAULT_BUCKET_NAME } = getEnv();
    if (!VITE_OBS_DEFAULT_BUCKET_NAME) {
      throw new Error(
        'Huawei Cloud The storage bucket name does not exist, please configure it first.',
      );
    }
    bucketName = VITE_OBS_DEFAULT_BUCKET_NAME;
  }
  return `https://${bucketName}.obs.cn-east-3.myhuaweicloud.com`;
}

export { getObssecretInfo };
