import { Acorn } from '@/types/acorn'
import { useState } from 'react'

export const useAcorns = () => {
  return useState<Acorn[]>([])
}
