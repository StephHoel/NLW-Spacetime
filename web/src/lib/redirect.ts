'use client'

import { base } from '@/lib/api'
import { useRouter } from 'next/router'

export function redirect(to: string) {
  // eslint-disable-next-line
  const router = useRouter()

  router.push(to)
}

export function handleCopyClick(id: string) {
  navigator.clipboard
    .writeText(`${base}/memories/details?id=${id}`)
    .then(() => {
      alert('Texto copiado com sucesso!')
    })
    .catch((error) => {
      alert(`Erro ao copiar texto: ${error}`)
    })
}
