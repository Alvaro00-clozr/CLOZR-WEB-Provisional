import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
