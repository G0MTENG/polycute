import { useUserId } from '@/components'
import { BackHeaderLayout } from '@/components/BackHeaderLayout'
import { WEBVIEW_URI } from '@/constants/uris'
import { useEffect, useRef } from 'react'

import { StyleSheet } from 'react-native'
import WebView from 'react-native-webview'

export default function Write() {
  const [userId] = useUserId()

  const webviewRef = useRef<WebView>(null)

  const onLoad = () => {
    if (webviewRef.current) {
      webviewRef.current.postMessage(
        JSON.stringify({
          type: 'userId',
          payload: userId,
        }),
      )
    }
  }

  return (
    <BackHeaderLayout>
      <WebView
        ref={webviewRef}
        style={styles.webview}
        onLoad={onLoad}
        source={{
          uri: `${WEBVIEW_URI}/write`,
        }}
      />
    </BackHeaderLayout>
  )
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
})
