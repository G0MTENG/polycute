import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const response = await req.json()
  const { adId } = response

  const user = await prisma.user.findUnique({
    where: { adId },
  })

  if (user) {
    return new Response(JSON.stringify({ userId: user.id }), { status: 200 })
  } else {
    const newUser = await prisma.user.create({
      data: { adId },
    })

    if (newUser) {
      return new Response(JSON.stringify({ userId: newUser.id }), { status: 200 })
    }
  }

  return new Response(null, { status: 500 })
}
