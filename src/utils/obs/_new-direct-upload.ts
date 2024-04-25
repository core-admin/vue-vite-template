import { getCommonObsUploadBasicInfo, directUploadObsFileApi2 } from '@/services/common/obs';
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
}

/**
 * @description OBS直传文件
 * @param file 文件
 * @param rename 是否需要重命名，重命名的文件名不包含文件后缀。如果为true，则会在文件名后面加上随机字符串
 */
function uploadObsFile(file: File, rename?: boolean): Promise<UploadObsFileRes>;
function uploadObsFile(file: File, rename?: string): Promise<UploadObsFileRes>;
async function uploadObsFile(file: File, rename?: boolean | string): Promise<UploadObsFileRes> {
  let fileName = file.name;
  const { fileName: _fileName, type } = getUrlFileNameAndType(fileName);
  const _rename = renameFile(_fileName, rename);
  const { signedUrl, actualSignedRequestHeaders } = await getCommonObsUploadBasicInfo(fileName);
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
  });
}

export { uploadObsFile };
