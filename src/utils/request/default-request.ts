import { useUserStoreWithOut } from '@/store/user';
import { ContextOptions, createAxios } from '../http/axios';
import { Message, createErrorAlertModal } from '@/hooks/web/useMessage';
import { getEnv, isDevMode } from '../env';
import { VAxios } from '../http/axios/src/Axios';
import { router } from '@/router';

const userStore = useUserStoreWithOut();

function getDefaultRequestContextOptions(): ContextOptions {
  return {
    getTokenFunction() {
      return userStore.getAccessToken;
    },
    getRefreshTokenFunction() {
      return userStore.getRefreshToken;
    },
    refreshTokenFunction() {
      return userStore.refreshTokenAction();
    },
    /**
     * NOTE: 新增了 refreshToken 功能后，403 由后端定义专门用来处理 token 过期的状态码，具体由什么原因导致的 403，由 data.code 字段来区分
     * 此处新增的 refreshTokenErrorFunction 是为了防止后期后端修改了 403 的含义，导致前端无法正常处理，如果 403 的定义不变，可以直接使用 httpForbiddenFunction 来处理
     */
    refreshTokenErrorFunction() {
      userStore.logoutAction();
      Message.error('登录已过期，请重新登录（刷新令牌失效）');
      // TODO: 测试代码，使用方自行修改
      setTimeout(() => {
        router.replace('/login');
      }, 2000);
    },
    // http status 401 用户身份过期
    httpUnauthorizedFunction(_response, _message) {
      userStore.logoutAction();
    },
    // http status 403
    httpForbiddenFunction(_response, _message) {
      //
    },
    handleHttpStateErrorFunction(_response, message, errorMessageMode) {
      if (errorMessageMode === 'modal') {
        const instance = createErrorAlertModal({
          header: '错误提示',
          body: message,
          onConfirm() {
            instance.hide();
          },
        });
        return;
      }
      if (errorMessageMode === 'message') {
        Message.error(message);
      }
    },
    // code 401 用户身份过期
    unauthorizedFunction(_response, _message) {
      const userStore = useUserStoreWithOut();
      userStore.logoutAction();
    },
    // code 403 没有权限
    forbiddenFunction(_response, _message) {
      // some code
    },
    errorModalFunction(_response, { title, content }) {
      const instance = createErrorAlertModal({
        header: title || '错误提示',
        body: content,
        onConfirm() {
          instance.hide();
        },
      });
    },
    errorMessageFunction(_response, message) {
      Message.error(message);
    },
  };
}

function _defaultRequest(): VAxios {
  const {
    VITE_DEFAULT_REQUEST_URL,
    VITE_DEFAULT_REQUEST_URL_PREFIX,
    VITE_DEFAULT_REQUEST_URL_PROXY_PREFIX,
  } = getEnv();
  return createAxios({
    requestOptions: {
      applyUrlPrefix: true,
      urlPrefix: VITE_DEFAULT_REQUEST_URL_PREFIX,
      baseApiUrl: () => {
        if (isDevMode() && VITE_DEFAULT_REQUEST_URL_PROXY_PREFIX) {
          return VITE_DEFAULT_REQUEST_URL_PROXY_PREFIX;
        }
        return VITE_DEFAULT_REQUEST_URL;
      },
    },
    contextOptions: getDefaultRequestContextOptions(),
  });
}

export const defaultRequest = _defaultRequest();
