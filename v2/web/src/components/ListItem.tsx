'use client'

import Image from 'next/image'
import Acorn from '@/assets/acorn.png'

type ListItemProps = {
  id: number
  title: string
  date: string
}

const handleClickDetailView = (id: number) => {
  window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'detail', payload: id }))
}

export const ListItem = ({ id, title, date }: ListItemProps) => {
  return (
    <li
      className='w-full px-2 py-4 flex items-center gap-4'
      onClick={() => handleClickDetailView(id)}
    >
      <Image src={Acorn} alt='acorn' width={32} height={32} className='rounded-full' />
      <h2 className='text-lg font-bold'>{title}</h2>
      <p className='flex-1 text-right text-sm text-[#ccc]'>{date.split('T')[0]}</p>
    </li>
  )
}
