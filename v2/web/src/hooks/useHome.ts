import { useEffect } from 'react'
import { useAdId } from './useAdId'

export const useHome = () => {
  const [adId, setAdId] = useAdId()

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const { type, payload } = JSON.parse(event.data)
      if (type === 'advertisingId') {
        setAdId(payload)
        ;(async () => {
          const response = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ adId: payload }),
          })
          const { userId } = await response.json()
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'userId', payload: userId }))
        })()
      }
    }

    window.addEventListener('message', onMessage)
    document.addEventListener('message', onMessage)

    return () => {
      window.removeEventListener('message', onMessage)
      document.removeEventListener('message', onMessage)
    }
  }, [])

  const handleClickNavigateWrite = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'navigate', payload: '../write' }))
  }

  const handleFetchAdId = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'fetchAdId', payload: null }))
  }

  return {
    adId,
    handleClickNavigateWrite,
    handleFetchAdId,
  }
}
