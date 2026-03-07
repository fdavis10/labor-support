import { API_BASE, ADMIN_PATH } from '../../config'

const ADMIN_API = `${API_BASE}/api/${ADMIN_PATH}`

function getToken() {
  return localStorage.getItem('admin_token')
}

export async function login(username, password) {
  const res = await fetch(`${ADMIN_API}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.detail || 'Ошибка входа')
  return data.token
}

export function logout() {
  localStorage.removeItem('admin_token')
}

export function setToken(token) {
  localStorage.setItem('admin_token', token)
}

export async function fetchNewsList() {
  const res = await fetch(`${ADMIN_API}/news/`, {
    headers: { Authorization: `Token ${getToken()}` },
  })
  if (res.status === 401) throw new Error('UNAUTHORIZED')
  if (!res.ok) throw new Error('Ошибка загрузки списка')
  return res.json()
}

export async function fetchNews(id) {
  const res = await fetch(`${ADMIN_API}/news/${id}/`, {
    headers: { Authorization: `Token ${getToken()}` },
  })
  if (res.status === 401) throw new Error('UNAUTHORIZED')
  if (!res.ok) throw new Error('Ошибка загрузки')
  return res.json()
}

export async function createNews(payload) {
  const isFormData = payload instanceof FormData
  const headers = { Authorization: `Token ${getToken()}` }
  if (!isFormData) headers['Content-Type'] = 'application/json'
  const res = await fetch(`${ADMIN_API}/news/`, {
    method: 'POST',
    headers,
    body: isFormData ? payload : JSON.stringify(payload),
  })
  if (res.headers.get('content-type')?.includes('application/json')) {
    const data = await res.json()
    if (!res.ok) throw new Error(data.detail || JSON.stringify(data) || 'Ошибка сохранения')
    return data
  }
  if (!res.ok) throw new Error('Ошибка сохранения')
  return res.json().catch(() => ({}))
}

export async function updateNews(id, payload) {
  const isFormData = payload instanceof FormData
  const headers = { Authorization: `Token ${getToken()}` }
  if (!isFormData) headers['Content-Type'] = 'application/json'
  const res = await fetch(`${ADMIN_API}/news/${id}/`, {
    method: 'PATCH',
    headers,
    body: isFormData ? payload : JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.detail || 'Ошибка сохранения')
  return data
}

export async function deleteNews(id) {
  const res = await fetch(`${ADMIN_API}/news/${id}/`, {
    method: 'DELETE',
    headers: { Authorization: `Token ${getToken()}` },
  })
  if (res.status === 401) throw new Error('UNAUTHORIZED')
  if (!res.ok) throw new Error('Ошибка удаления')
}

// --- Заявки на звонок ---

export async function fetchLeadsList() {
  const res = await fetch(`${ADMIN_API}/leads/`, {
    headers: { Authorization: `Token ${getToken()}` },
  })
  if (res.status === 401) throw new Error('UNAUTHORIZED')
  if (!res.ok) throw new Error('Ошибка загрузки заявок')
  return res.json()
}

// --- Текущий пользователь (профиль) ---

export async function fetchCurrentUser() {
  const res = await fetch(`${ADMIN_API}/users/me/`, {
    headers: { Authorization: `Token ${getToken()}` },
  })
  if (res.status === 401) throw new Error('UNAUTHORIZED')
  if (!res.ok) throw new Error('Ошибка загрузки профиля')
  return res.json()
}

export async function updateProfile(payload) {
  const res = await fetch(`${ADMIN_API}/users/me/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Token ${getToken()}` },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (res.status === 401) throw new Error('UNAUTHORIZED')
  if (!res.ok) throw new Error(data.detail || 'Ошибка сохранения')
  return data
}

// --- Пользователи (только суперюзер) ---

export async function fetchUsersList() {
  const res = await fetch(`${ADMIN_API}/users/`, {
    headers: { Authorization: `Token ${getToken()}` },
  })
  if (res.status === 401) throw new Error('UNAUTHORIZED')
  if (res.status === 403) throw new Error('FORBIDDEN')
  if (!res.ok) throw new Error('Ошибка загрузки списка')
  return res.json()
}

export async function createUser(username, password) {
  const res = await fetch(`${ADMIN_API}/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Token ${getToken()}` },
    body: JSON.stringify({ username, password }),
  })
  const data = await res.json().catch(() => ({}))
  if (res.status === 401) throw new Error('UNAUTHORIZED')
  if (res.status === 403) throw new Error('FORBIDDEN')
  if (!res.ok) throw new Error(data.username?.[0] || data.detail || 'Ошибка создания')
  return data
}
