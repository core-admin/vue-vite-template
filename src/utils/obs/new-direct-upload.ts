import {
  getCommonObsUploadBasicInfo,
  directUploadObsFileApi2,
  ObsUploadBasicInfoRes,
} from '@/services/common/obs';
import { isString, isUnDef } from '@/utils/is';
import { nanoid } from 'nanoid';
import { getUrlFileNameAndType } from '../file';
import { getDomainAndPathnameUrl } from '.';

function renameFile(fileName: string, rename?: boolean | string): string {
  if (isString(rename) && rename !== '') {
    return rename;
  }
  if (isUnDef(rename)) {
    return '';
  }
  if (rename) {
    return `${fileName}_${nanoid(10)}`;
  }
  return '';
}

interface UploadObsFileRes {
  url: string;
  fileName: string;
  rename?: string;
  signatureData: ObsUploadBasicInfoRes;
}

/**
 * @description OBS直传文件
 * @param file 文件
 * @param options.rename 是否需要重命名，重命名的文件名不包含文件后缀。如果为true，则会在文件名后面加上随机字符串
 * @param options.signatureReqUrl 获取签名的接口地址
 */
async function uploadObsFile(
  file: File,
  options: {
    rename?: boolean | string;
    signatureReqUrl?: string;
  } = {},
): Promise<UploadObsFileRes> {
  const { rename, signatureReqUrl } = options;
  let fileName = file.name;
  const { fileName: _fileName, type } = getUrlFileNameAndType(fileName);
  const _rename = renameFile(_fileName, rename);
  const signatureInfo = await getCommonObsUploadBasicInfo(fileName, signatureReqUrl);
  const { signedUrl, actualSignedRequestHeaders } = signatureInfo;
  if (_rename !== '') {
    fileName = `${_rename}.${type}`;
    actualSignedRequestHeaders['Content-Disposition'] = `attachment;filename=${encodeURIComponent(
      fileName,
    )}`;
  }
  await directUploadObsFileApi2(file, signedUrl, actualSignedRequestHeaders);

  return Promise.resolve({
    url: getDomainAndPathnameUrl(signedUrl),
    fileName: file.name,
    rename: _rename !== '' ? fileName : undefined,
    signatureData: signatureInfo,
  });
}

function initialUploadObsFile(signatureReqUrl: string) {
  return (file: File, rename?: boolean | string) => {
    return uploadObsFile(file, {
      rename,
      signatureReqUrl,
    });
  };
}

export { uploadObsFile, initialUploadObsFile };
