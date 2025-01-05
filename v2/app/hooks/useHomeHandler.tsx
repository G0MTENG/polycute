import { useUserId } from '@/components'
import { InfoModalContent } from '@/components/InfoModalContent'
import { useModalContext } from '@/components/modalProvider'
import { handleMessage } from '@/utils/handleMessage'
import { useRouter } from 'expo-router'
import { getAdvertisingId, requestTrackingPermissionsAsync } from 'expo-tracking-transparency'
import { RefObject } from 'react'
import WebView from 'react-native-webview'

export const useHomeHandler = (ref: RefObject<WebView>) => {
  const router = useRouter()
  const { open } = useModalContext()
  const [, setUserId] = useUserId()

  const handler = async (type: string, payload: any) => {
    switch (type) {
      case 'navigate':
        router.navigate(payload)
        break
      case 'fetchAdId':
        if (ref.current) {
          const adId = getAdvertisingId()

          if (adId) {
            ref.current.postMessage(
              JSON.stringify({
                type: 'advertisingId',
                payload: adId,
              }),
            )
          } else {
            const { status } = await requestTrackingPermissionsAsync()
            if (status === 'granted') {
              const advertisingId = getAdvertisingId()
              ref.current.postMessage(
                JSON.stringify({
                  type: 'advertisingId',
                  payload: advertisingId,
                }),
              )
            }
          }
        }
        break
      case 'userId':
        setUserId(payload)
        break
      case 'question':
        open(<InfoModalContent />)
      default:
        break
    }
  }

  return handleMessage(handler).onMessage
}
