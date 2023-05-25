import decode from 'jwt-decode'
import { cookies } from 'next/headers'

import { User } from './interfaces'
import { redirect } from './redirect'

export function getUser(): User {
  if (!hasAuth()) redirect('/')

  const user: User = decode(getToken() ?? '')

  return user
}

export function getToken() {
  return cookies().get('token')?.value
}

export function hasAuth() {
  return cookies().has('token')
}
