'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookie from 'js-cookie'

import { Camera } from 'lucide-react'

import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { api } from '@/lib/api'

import { MediaPicker } from '@/components/MediaPicker'

registerLocale('pt-BR', ptBR) // Registra o locale pt-BR

export function NewMemoryForm() {
  const router = useRouter()

  const [dateSelected, setDateSelected] = useState<Date>(new Date())

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    // console.log(fileToUpload)

    const size = fileToUpload instanceof File ? fileToUpload.size : 0

    if (formData.get('content') || size !== 0) {
      if (fileToUpload && size !== 0) {
        const uploadFormData = new FormData()
        uploadFormData.set('file', fileToUpload)

        const uploadResponse = await api.post('/upload', uploadFormData)

        coverUrl = uploadResponse.data.ok

        // console.log(uploadResponse.data)
      }

      const dateMemory = new Date(
        `${format(dateSelected, 'yyyy-MM-dd')}T04:00:00.000Z`,
      )

      await api.post(
        '/memories',
        {
          coverUrl,
          content: formData.get('content'),
          isPublic: formData.get('isPublic'),
          dateMemory,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookie.get('token')}`,
          },
        },
      )

      router.push('/')
    } else alert('Não é possível cadastrar uma memória vazia')
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>

        <label htmlFor="">
          <DatePicker
            selected={dateSelected}
            onChange={(date: Date) => {
              setDateSelected(date)
            }}
            dateFormat="dd/MM/yyyy"
            locale="pt-BR"
            placeholderText="Quando?"
            maxDate={new Date()}
            className="rounded border border-gray-300 bg-transparent px-4 py-2 text-gray-200 placeholder:text-gray-300  focus:border-purple-500 focus:outline-none"
          />
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        salvar
      </button>
    </form>
  )
}
