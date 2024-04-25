declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    ENV_MODE: ViteEnv['MODE'];
  }
}
