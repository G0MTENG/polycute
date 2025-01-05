import { useRouter, useSearchParams } from 'expo-router/build/hooks'
import WebView, { WebViewMessageEvent } from 'react-native-webview'
import { WEBVIEW_URI } from '@/constants/uris'

export default function Read() {
  const router = useRouter()
  const params = useSearchParams()
  const id = params.get('id')
  const onMessage = (event: WebViewMessageEvent) => {
    const { type } = JSON.parse(event.nativeEvent.data)

    switch (type) {
      case 'back':
        router.back()
        break
      default:
        break
    }
  }

  return (
    <WebView
      style={{ flex: 1 }}
      source={{
        uri: `${WEBVIEW_URI}/read/${id}`,
      }}
      onMessage={onMessage}
    />
  )
}
