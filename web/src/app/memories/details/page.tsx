import Image from 'next/image'
import Link from 'next/link'

import dayjs from 'dayjs'
import ptbr from 'dayjs/locale/pt-br'

import { ClipboardCopy, Edit, Trash2 } from 'lucide-react'

import { EmptyMemories } from '@/components/EmptyMemories'

import { handleCopy } from '@/components/HandleCopy'
import { api } from '@/lib/api'
import { getToken, hasAuth } from '@/lib/auth'
import { Memory } from '@/lib/interfaces'

dayjs.locale(ptbr)

export default async function Memories({ searchParams }: any) {
  if (!hasAuth()) return <EmptyMemories />

  const { id } = searchParams

  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  const memory: Memory = response.data

  return (
    <div className="p-4">
      {/* <div>{memory.dateMemory}</div> */}
      <div className="mb-4 flex flex-row justify-between">
        <time className="-ml-6 flex items-center gap-2 text-lg text-gray-100  before:h-px before:w-8 before:bg-gray-50">
          {dayjs(memory.dateMemory).format('D[ de ]MMMM[ de ]YYYY')}
        </time>

        <div className="flex flex-row space-x-6">
          {memory.isPublic ? (
            <div title="Copiar link para compartilhar">
              <ClipboardCopy
                className="h-6 w-6 cursor-pointer"
                onClick={handleCopy}
              />
            </div>
          ) : null}

          <Link href={`/memories/edit?id=${id}`} title="Editar">
            <Edit className=" h-6 w-6" />
          </Link>

          <Link href={`/memories/delete?id=${id}`} title="Excluir">
            <Trash2 className="h-6 w-6" />
          </Link>
        </div>
      </div>

      {memory.coverUrl ? (
        <Image
          src={memory.coverUrl}
          alt=""
          width={592}
          height={280}
          className="aspect-video w-full rounded-lg object-cover"
        />
      ) : null}

      <p className="p-4 text-base leading-relaxed text-gray-100">
        {memory.content}
      </p>
    </div>
  )
}
