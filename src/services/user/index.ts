export * from './type';
import { defaultRequest as request } from '@/utils/request/default-request';
import { LoginParams, AuthToken } from './type';
import { REFRESH_TOKEN_URL } from '@/configs/constant';

export function loginApi(data: LoginParams) {
  return request.post<AuthToken>({
    url: '/user/login',
    data,
  });
}

export function noAuthTestApi() {
  return request.get<string>({
    url: '/user/no_auth',
  });
}

export function needAuthTestApi(flag: string) {
  return request.get<string>({
    url: '/user/need_auth?flag=' + flag,
  });
}

export function refreshTokenApi(refreshToken: string) {
  return request.get<AuthToken>(
    {
      url: REFRESH_TOKEN_URL,
      params: { refreshToken },
    },
    {
      errorMessageMode: 'none',
      includeToken: false,
    },
  );
}
