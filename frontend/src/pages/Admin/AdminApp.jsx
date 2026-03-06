import { Routes, Route, Navigate } from 'react-router-dom'
import { ADMIN_PATH } from '../../config'
import { AdminLogin } from './AdminLogin'
import { AdminLayout } from './AdminLayout'
import { NewsList } from './NewsList'
import { NewsForm } from './NewsForm'
import { Profile } from './Profile'
import { UserList } from './UserList'

const token = () => localStorage.getItem('admin_token')

export function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={token() ? <Navigate to={`/${ADMIN_PATH}`} replace /> : <AdminLogin />} />
      <Route path="*" element={token() ? <AdminLayout /> : <Navigate to={`/${ADMIN_PATH}/login`} replace />}>
        <Route index element={<NewsList />} />
        <Route path="news/new" element={<NewsForm />} />
        <Route path="news/:id/edit" element={<NewsForm />} />
        <Route path="profile" element={<Profile />} />
        <Route path="users" element={<UserList />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${ADMIN_PATH}`} replace />} />
    </Routes>
  )
}
