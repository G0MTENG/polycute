'use client'

import { ListItem } from '@/components/ListItem'
import { useAcorns } from '@/hooks/useAcorns'
import { useEffect } from 'react'

export default function ListPage() {
  const [acorns, setAcorns] = useAcorns()

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const { type, payload } = JSON.parse(event.data)
      switch (type) {
        case 'userId':
          ;(async () => {
            const response = await fetch(`/api/acorns?userId=${payload}`)
            const data = await response.json()
            setAcorns(data)
          })()
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
    <ul className='size-full overflow-y-auto p-4 flex flex-col gap-4'>
      {acorns.map(({ id, title, createdAt }) => (
        <ListItem key={id} id={id} title={title} date={createdAt} />
      ))}
    </ul>
  )
}
