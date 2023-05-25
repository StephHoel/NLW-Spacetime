'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (files && files[0].size <= 5 * 1024 * 1024) {
      const previewURL = URL.createObjectURL(files[0])

      setPreview(previewURL)
    } else {
      alert('O arquivo excede o tamanho máximo permitido (5MB).')
    }
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        name="coverUrl"
        type="file"
        id="media"
        accept="image/*, video/*"
        className="invisible h-0 w-0"
      />

      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="aspect-auto w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
