'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import Image from 'next/image'

import Cookie from 'js-cookie'
import { Camera } from 'lucide-react'

import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { api } from '@/lib/api'
import { Memory } from '@/lib/interfaces'

registerLocale('pt-BR', ptBR) // Registra o locale pt-BR

export function EditMemoryForm(memory: Memory) {
  const router = useRouter()

  const [dateSelected, setDateSelected] = useState<Date>(
    new Date(memory.dateMemory),
  )

  const [isPublic, setIsPublic] = useState(memory.isPublic)
  const [content, setContent] = useState(memory.content)

  async function handleUpdateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const token = Cookie.get('token')

    const formattedDate = format(dateSelected, 'yyyy-MM-dd')

    await api.put(
      `/memories/${memory.id}`,
      {
        coverUrl: memory.coverUrl,
        content,
        isPublic,
        dateMemory: new Date(formattedDate),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/')
  }

  return (
    <form onSubmit={handleUpdateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor="media"
          className="flex cursor-not-allowed items-center gap-1.5 text-sm text-gray-200 line-through"
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
            checked={isPublic}
            onChange={(e) => {
              setIsPublic(e.target.checked)
            }}
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

      <Image
        src={memory.coverUrl}
        alt=""
        className="aspect-auto w-full rounded-lg object-cover"
        width={100}
        height={100}
      />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        defaultValue={content}
        onChange={(e) => {
          setContent(e.target.value)
        }}
      />

      <div className="flex w-full justify-between space-x-4">
        <button
          onClick={() => {
            router.push(`/memories/details?id=${memory.id}`)
          }}
          className="inline-block w-1/2 rounded-full bg-red-500 px-5 py-3 text-center font-alt text-sm uppercase leading-none text-gray-50  hover:bg-red-600"
        >
          cancelar
        </button>
        <button
          type="submit"
          className="inline-block w-1/2 rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        >
          salvar
        </button>
      </div>
    </form>
  )
}
