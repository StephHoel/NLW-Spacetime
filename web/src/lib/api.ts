import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.0.2:3333',
})

export const signInUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export const base = 'http://localhost:3000'
