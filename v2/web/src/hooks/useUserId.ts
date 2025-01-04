import { useState } from 'react'

export const useUserId = () => {
  return useState<number>(-1)
}
