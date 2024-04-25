export * from './type';
import { defaultRequest as request } from '@/utils/request/default-request';
import { ObsAccessInfo, ObsUploadBasicInfoRes } from './type';
import { ContentTypeEnum } from '@/utils/http/axios';
import { RawAxiosRequestHeaders } from 'axios';
import { omit } from 'lodash-es';

/**
 * 获取OBS上传文件的access信息
 */
export function getObsAccessApi(data: { bucketName: string; dir: string }) {
  return request.post<ObsAccessInfo>(
    {
      url: '/obs/get_signature',
      data,
    },
    {
      errorMessageMode: 'none',
    },
  );
}

/**
 * OBS直传文件
 */
export function directUploadObsFileApi(data: FormData, url: string) {
  return request.post<void>(
    {
      data,
      headers: {
        'Content-Type': ContentTypeEnum.FORM_DATA,
      },
    },
    {
      baseApiUrl: url,
      applyUrlPrefix: false,
      returnRequestResponse: true,
      errorMessageMode: 'none',
    },
  );
}

// ------------------- obs 测试接口 start -------------------

export function getCommonObsUploadBasicInfo(fileName: string, url?: string) {
  return request.get<ObsUploadBasicInfoRes>(
    {
      url: url || '/obs_test',
      params: {
        fileName,
      },
    },
    {
      returnRequestResponse: false,
    },
  );
}

export function directUploadObsFileApi2(
  file: File,
  uploadUrl: string,
  headers: RawAxiosRequestHeaders & ObsUploadBasicInfoRes['actualSignedRequestHeaders'],
) {
  return request.put(
    {
      headers: omit(headers, ['Host']),
      data: file,
    },
    {
      baseApiUrl: uploadUrl,
      applyUrlPrefix: false,
      returnRequestResponse: false,
    },
  );
}

// ------------------- obs 测试接口 end ---------------------
