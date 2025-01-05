'use server'

import { prisma } from './prisma'

export async function createAcorn(formData: FormData) {
  const document = formData.get('document') as string
  const title = formData.get('title') as string
  const userId = Number(formData.get('userId'))

  if (userId === -1) {
    throw new Error('회원 정보를 다시 받아와 주세요.')
  }

  try {
    await prisma.acorn.create({
      data: {
        title,
        document,
        userId,
      },
    })
  } catch (error) {
    throw new Error('메모를 생성하는 데 실패했습니다.')
  }
}
