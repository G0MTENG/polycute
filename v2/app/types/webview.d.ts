export declare global {
  interface Window {
    ReactNativeWebview: {
      postMessage: (message: any) => void;
    };
  }
}
