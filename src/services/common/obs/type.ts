export interface ObsAccessInfo {
  accessKeyId: string;
  policy: string;
  signature: string;
}

export interface ObsUploadBasicInfoRes {
  actualSignedRequestHeaders: {
    'Content-Disposition': string;
    'Content-Type': 'text/plain';
    // Host: string;
  } & Record<string, string>;
  signedUrl: string;
}
