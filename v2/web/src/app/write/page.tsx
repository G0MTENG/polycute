'use client'

import { Button } from '@/components'
import { useUserId } from '@/hooks'
import { createAcorn } from '@/lib/createAcorn'
import { useEffect } from 'react'

export default function WritePage() {
  const [userId, setUserId] = useUserId()

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const { type, payload } = JSON.parse(event.data)
      switch (type) {
        case 'userId':
          setUserId(payload)
          break
        default:
          break
      }
    }

    window.addEventListener('message', onMessage)
    document.addEventListener('message', onMessage)

    return () => {
      window.removeEventListener('message', onMessage)
      document.removeEventListener('message', onMessage)
    }
  }, [])

  return (
    <form
      action={createAcorn}
      className='size-full overflow-y-auto flex flex-col items-center px-4 pb-4 gap-4'
    >
      <textarea name='document' className='w-full p-4 flex-1 border rounded-md' />
      <input name='userId' type='hidden' defaultValue={userId} />
      <Button type='submit'>작성하기</Button>
    </form>
  )
}
