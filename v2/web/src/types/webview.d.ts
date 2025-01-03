export declare global {
  interface Document {
    addEventListener<K extends keyof WindowEventMap>(
      type: K,
      listener: (this: Window, ev: WindowEventMap[K]) => unknown,
      options?: boolean | AddEventListenerOptions,
    ): void
    removeEventListener<K extends keyof WindowEventMap>(
      type: K,
      listener: (this: Window, ev: WindowEventMap[K]) => unknown,
      options?: boolean | EventListenerOptions,
    ): void
  }
}
