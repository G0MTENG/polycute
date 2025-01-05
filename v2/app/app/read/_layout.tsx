import { Slot } from 'expo-router'
import { BackHeaderLayout } from '@/components'

export default function Read() {
  return (
    <BackHeaderLayout>
      <Slot />
    </BackHeaderLayout>
  )
}
