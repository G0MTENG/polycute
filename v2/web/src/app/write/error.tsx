'use client'

import { Button } from '@/components'
import Image from 'next/image'
import { useEffect } from 'react'
import Acorn from '@/assets/acorn.png'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='size-full overflow-y-auto flex flex-col items-center justify-center px-4 pb-4 gap-4'>
      <Image src={Acorn} alt='Acorn' width={100} height={100} />
      <h2>에러가 발생했습니다.</h2>
      <Button onClick={() => reset()}>다시 시도하기</Button>
    </div>
  )
}
