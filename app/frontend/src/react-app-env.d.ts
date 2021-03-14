/// <reference types="react-scripts" />
/// <reference types="react-dom/experimental" />
/// <reference types="react/experimental" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    REACT_APP_API_BASE_URL: string;
    REACT_APP_IS_BETA_ENABLED: boolean;
    REACT_APP_VERSION: string;
  }
}
