import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

import { EmptyMemories } from '@/components/EmptyMemories'

import { api } from '@/lib/api'
import { getToken, hasAuth } from '@/lib/auth'
import { Memory } from '@/lib/interfaces'

import dayjs from 'dayjs'
import ptbr from 'dayjs/locale/pt-br'

dayjs.locale(ptbr)

export default async function Home() {
  if (!hasAuth) return <EmptyMemories />

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  const memories: Memory[] = response.data

  if (memories.length === 0) return <EmptyMemories />

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.dateMemory).format('D[ de ]MMMM[, ]YYYY')}
            </time>

            {memory.coverUrl ? (
              <Image
                src={memory.coverUrl}
                alt=""
                width={592}
                height={280}
                className="aspect-video w-full rounded-lg object-cover"
              />
            ) : null}

            <p className="text-lg leading-relaxed text-gray-100">
              {memory.content}
            </p>

            <a
              href={`/memories/details?id=${memory.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )
      })}
    </div>
  )
}
