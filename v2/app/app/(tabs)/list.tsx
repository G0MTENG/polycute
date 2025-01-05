import { useUserId } from '@/components'
import { WEBVIEW_URI } from '@/constants/uris'
import { useRouter } from 'expo-router'
import { useRef } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import WebView, { WebViewMessageEvent } from 'react-native-webview'

export default function List() {
  const router = useRouter()
  const [userId] = useUserId()
  const webviewRef = useRef<WebView>(null)

  const onMessage = (event: WebViewMessageEvent) => {
    const { type, payload } = JSON.parse(event.nativeEvent.data)

    switch (type) {
      case 'detail':
        router.push({
          pathname: '../read/[id]',
          params: {
            id: payload,
          },
        })
        break
      default:
        break
    }
  }

  const onLoad = () => {
    if (webviewRef.current) {
      webviewRef.current.postMessage(JSON.stringify({ type: 'userId', payload: userId }))
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        style={styles.webview}
        source={{
          uri: `${WEBVIEW_URI}/list`,
        }}
        onMessage={onMessage}
        onLoad={onLoad}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
})
