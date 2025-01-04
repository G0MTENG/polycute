import { WebViewMessageEvent } from 'react-native-webview'

export const handleMessage = (handler: (type: string, payload: any) => void) => {
  const onMessage = (event: WebViewMessageEvent) => {
    const { type, payload } = JSON.parse(event.nativeEvent.data)
    handler(type, payload)
  }

  return {
    onMessage,
  }
}
