'use client'

import Image from 'next/image'
import Acorn from '@/assets/acorn.png'
import { useHome } from '@/hooks'
import { Button } from '@/components'

export default function Home() {
  const { adId, handleClickNavigateWrite, handleFetchAdId } = useHome()
  const handleClickQuestionButton = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'question', payload: null }))
  }

  return (
    <div className='size-full flex flex-col justify-center items-center gap-4 p-4 relative'>
      <Image src={Acorn} alt='acorn' width={120} height={120} />
      <h1 className='font-extrabold text-2xl text-[#CB8252] mb-6'>ACORN</h1>

      <div className='flex flex-col gap-3 w-full px-4 py-6 border border-[#CB8252] rounded-lg bg-white shadow-sm'>
        {adId ? (
          <>
            <p className='text-md font-medium'>광고 ID</p>
            <p className='text-sm'>{adId}</p>
          </>
        ) : (
          <p className='text-sm'>정보 불러오기를 통해 데이터를 가져와주세요.</p>
        )}
      </div>

      <div className='flex w-full justify-center items-center'>
        {adId ? (
          <Button onClick={handleClickNavigateWrite}>글 쓰러가기</Button>
        ) : (
          <Button onClick={handleFetchAdId}>정보 불러오기</Button>
        )}
      </div>

      <button
        onClick={handleClickQuestionButton}
        className='absolute px-4 py-2 border bottom-4 right-4 rounded-full shadow-md font-extrabold'
      >
        ?
      </button>
    </div>
  )
}
