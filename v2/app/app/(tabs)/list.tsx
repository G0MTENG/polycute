import { Button } from '@/components/Button'
import { WEBVIEW_URI } from '@/constants/uris'
import { useRouter } from 'expo-router'
import { getAdvertisingId, requestTrackingPermissionsAsync } from 'expo-tracking-transparency'
import { useEffect, useRef, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import WebView, { WebViewMessageEvent } from 'react-native-webview'

const useAdId = () => {
  return useState<string | null>(null)
}

export default function List() {
  const [adId, setAdId] = useAdId()
  const router = useRouter()
  const webviewRef = useRef<WebView>(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await requestTrackingPermissionsAsync()
      if (status === 'granted') {
        const advertisingId = getAdvertisingId()
        setAdId(advertisingId)
      }
    })()
  }, [setAdId])

  const handleNavigateHome = () => {
    router.replace('/(tabs)')
  }

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
      case 'home':
        router.replace('/(tabs)')
        break
      default:
        break
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {adId ? (
        <WebView
          ref={webviewRef}
          style={styles.webview}
          source={{
            uri: `${WEBVIEW_URI}/list/${adId}`,
          }}
          onMessage={onMessage}
        />
      ) : (
        <View style={[styles.container, styles.alert]}>
          <Text>홈으로 가서 광고 ID를 불러와주세요!</Text>
          <Button onPress={handleNavigateHome}>홈으로 가기</Button>
        </View>
      )}
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
  alert: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
})
