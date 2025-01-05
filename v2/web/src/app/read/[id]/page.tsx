import { ReactMarkdown } from '@/components'
import { prisma } from '@/lib'

export const revalidate = 60

export const dynamicParams = true

export async function generateStaticParams() {
  const acorns = await prisma.acorn.findMany()

  return acorns.map((acorn) => ({
    id: String(acorn.id),
  }))
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const acorn = await prisma.acorn.findUnique({ where: { id: Number(id) } })

  if (!acorn) {
    return new Error('Not Found')
  }

  const { title, createdAt, document } = acorn

  const markdownData = `
  # This is a H1
  ## This is a H2
  ### This is a H3

  ~~~ts
  const foo: string = 'bar'
  ~~~
  `

  return (
    <main className='size-full p-4 flex flex-col gap-4 overflow-y-auto'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold text-gray-800'>{title}</h1>
        <p className='text-gray-500 text-sm'>{new Date(createdAt).toLocaleDateString()}</p>
      </header>
      <ReactMarkdown>{markdownData}</ReactMarkdown>
    </main>
  )
}
