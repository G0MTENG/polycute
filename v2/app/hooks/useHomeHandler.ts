import { useUserId } from '@/components'
import { handleMessage } from '@/utils/handleMessage'
import { useRouter } from 'expo-router'
import { getAdvertisingId } from 'expo-tracking-transparency'
import { RefObject } from 'react'
import WebView from 'react-native-webview'

export const useHomeHandler = (ref: RefObject<WebView>) => {
  const router = useRouter()
  const [, setUserId] = useUserId()

  const handler = (type: string, payload: any) => {
    switch (type) {
      case 'navigate':
        router.navigate(payload)
        break
      case 'fetchAdId':
        if (ref.current) {
          ref.current.postMessage(
            JSON.stringify({
              type: 'advertisingId',
              payload: getAdvertisingId(),
            }),
          )
        }
        break
      case 'userId':
        setUserId(payload)
        break
      default:
        break
    }
  }

  return handleMessage(handler).onMessage
}
