'use client'

import Image from 'next/image'
import Acorn from '@/assets/acorn.png'
import { useHome } from '@/hooks'
import { Button } from '@/components'

export default function Home() {
  const { adId, handleClickNavigateWrite, handleFetchAdId } = useHome()

  return (
    <div className='size-full flex flex-col justify-center items-center gap-4 p-4'>
      <Image src={Acorn} alt='acorn' width={160} height={160} />
      {adId ? <p>광고 ID: {adId}</p> : <p>정보 불러오기를 통해 데이터를 가져와주세요.</p>}
      <div className='flex flex-row w-full justify-center items-center'>
        {adId ? (
          <Button onClick={handleClickNavigateWrite}>글 쓰러가기</Button>
        ) : (
          <Button onClick={handleFetchAdId}>정보 불러오기</Button>
        )}
      </div>
    </div>
  )
}
