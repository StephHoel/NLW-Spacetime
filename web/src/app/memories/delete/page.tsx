'use client'

import { useRouter } from 'next/navigation'
import Cookie from 'js-cookie'

import { api } from '@/lib/api'

export default async function DeleteMemory({ searchParams }: any) {
  const router = useRouter()

  const { id } = searchParams

  if (id !== '') {
    await api
      .delete(`/memories/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookie.get('token')}`,
        },
      })
      .then(() => {
        alert('Memória excluída com sucesso! 😢')
      })
      .catch((error) => {
        console.error(error)
        alert('Erro na exclusão, tente novamente!')
      })

    router.push('/')
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      Excluindo sua memória 😢
    </div>
  )
}
