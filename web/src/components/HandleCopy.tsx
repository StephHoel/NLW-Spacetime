'use client'

export async function handleCopy() {
  if (typeof window !== 'undefined' && 'clipboard' in navigator) {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copiado com sucesso!')
    } catch (error) {
      console.error('Erro ao copiar o conteúdo:', error)
    }
  } else {
    console.error(
      'A API da área de transferência não é suportada neste navegador.',
    )
  }
}
