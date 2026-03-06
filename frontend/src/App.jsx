import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainSite } from './pages/MainSite'
import { AdminApp } from './pages/Admin/AdminApp'
import { ADMIN_PATH } from './config'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/${ADMIN_PATH}/*`} element={<AdminApp />} />
        <Route path="*" element={<MainSite />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
