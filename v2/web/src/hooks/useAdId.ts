import { useState } from 'react'

export const useAdId = () => {
  return useState<string>('')
}
