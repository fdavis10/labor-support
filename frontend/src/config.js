// Скрытый путь админки — не добавлять в навигацию и не светить в коде публично.
// Должен совпадать с ADMIN_API_PREFIX на бэкенде (или env VITE_ADMIN_PATH).
export const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || 'c8k2m9p5'
export const API_BASE = import.meta.env.VITE_API_URL || ''
