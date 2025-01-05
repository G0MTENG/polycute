import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = Number(searchParams.get('userId'))

  if (userId === 0) {
    return new Response(null, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    return new Response(null, { status: 404 })
  }

  const acorns = await prisma.acorn.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  if (!acorns) {
    return new Response(null, { status: 404 })
  }

  return new Response(JSON.stringify(acorns), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(request: Request) {
  const { userId, title, document } = await request.json()
  let acorn = null
  try {
    acorn = await prisma.acorn.create({
      data: { userId, title, document },
    })
  } catch (error) {
    return new Response(null, { status: 404 })
  }

  return new Response(JSON.stringify(acorn), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}
