import { Link, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminBacklogsPage from './pages/AdminBacklogsPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminFeedbacksPage from './pages/AdminFeedbacksPage'
import FeedbackFormPage from './pages/FeedbackFormPage'
import MyFeedbacksPage from './pages/MyFeedbacksPage'

function App() {
  return (
    <div>
      <header>
        <h1>Feedback2Backlog</h1>
        <nav aria-label="main navigation">
          <Link to="/feedback">피드백 작성</Link> |
          <Link to="/my-feedbacks">내 피드백</Link> |
          <Link to="/admin">관리자 대시보드</Link> | 
          <Link to="/admin/feedbacks">전체 피드백</Link> | 
          <Link to="/admin/backlogs">백로그</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/feedback" replace />} />
          <Route path="/feedback" element={<FeedbackFormPage />} />
          <Route path="/my-feedbacks" element={<MyFeedbacksPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/feedbacks" element={<AdminFeedbacksPage />} />
          <Route path="/admin/backlogs" element={<AdminBacklogsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
