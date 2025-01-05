import { ListItem } from '@/components/ListItem'
import { prisma } from '@/lib'
import { formatDateKo } from '@/utils/date'

export default async function Page({ params }: { params: Promise<{ adId: string }>}) {
  const adId = (await params).adId
  const user = await prisma.user.findUnique({
    where: { adId },
  })

  if (!user) {
    throw new Error('존재하지 않는 유저입니다.')
  }

  const acorns = await prisma.acorn.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <ul className='size-full overflow-y-auto px-4 pb-4 flex flex-col gap-4'>
      {acorns.length === 0 ? <div>데이터를 추가해보세요.</div> : acorns.map(({ id, title, createdAt }) => {
        const date = formatDateKo(createdAt)
        return <ListItem key={id} id={id} title={title} date={date} />
      })}
    </ul>
  )
}
