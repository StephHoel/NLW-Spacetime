// import Image from 'next/image'

import dayjs from 'dayjs'
import ptbr from 'dayjs/locale/pt-br'

import { api } from '@/lib/api'
import { getToken } from '@/lib/auth'
import { Memory } from '@/lib/interfaces'

import { EditMemoryForm } from '@/components/EditMemoryForm'

dayjs.locale(ptbr)

export default async function EditMemories({ searchParams }: any) {
  const { id } = searchParams

  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  const memory: Memory = response.data

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <EditMemoryForm
        id={memory.id}
        coverUrl={memory.coverUrl}
        content={memory.content}
        dateMemory={memory.dateMemory}
        isPublic={memory.isPublic}
      />
    </div>
  )
}
