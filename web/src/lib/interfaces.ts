export interface Memory {
  id: string
  coverUrl: string
  content: string
  dateMemory: string
  isPublic: boolean
}

export interface User {
  sub: string
  name: string
  avatarUrl: string
}