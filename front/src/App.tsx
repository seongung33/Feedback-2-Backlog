import { useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminBacklogsPage from './pages/AdminBacklogsPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminFeedbacksPage from './pages/AdminFeedbacksPage'
import FeedbackFormPage from './pages/FeedbackFormPage'
import MyFeedbacksPage from './pages/MyFeedbacksPage'

export type FeedbackStatus = 'pending' | 'converted' | 'resolved'
export type BacklogStatus = 'todo' | 'in_progress' | 'done'
export type BacklogPriority = 'High' | 'Medium' | 'Low'

export type Feedback = {
  id: number
  userId: string
  feature: string
  painPoint: string
  suggestion: string
  status: FeedbackStatus
  backlogId: number | null
  createdAt: string
}

export type Backlog = {
  id: number
  title: string
  problem: string
  requirement: string
  priority: BacklogPriority
  area: string
  status: BacklogStatus
  relatedFeedbackIds: number[]
  createdAt: string
  resolvedAt: string | null
}

export type CreateFeedbackInput = {
  feature: string
  painPoint: string
  suggestion: string
}

function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [backlogs, setBacklogs] = useState<Backlog[]>([])

  const unresolvedFeedbackCount = feedbacks.filter(
    (feedback) => feedback.status === 'pending' || feedback.status === 'converted',
  ).length

  const doneBacklogCount = backlogs.filter(
    (backlog) => backlog.status === 'done',
  ).length

  const handleCreateFeedback = (input: CreateFeedbackInput) => {
    const newFeedback: Feedback = {
      id: Date.now(),
      userId: 'user-1',
      feature: input.feature,
      painPoint: input.painPoint,
      suggestion: input.suggestion,
      status: 'pending',
      backlogId: null,
      createdAt: new Date().toISOString().slice(0, 10),
    }

    setFeedbacks((currentFeedbacks) => [newFeedback, ...currentFeedbacks])
  }

  const handleGenerateBacklogs = () => {
    const pendingFeedbacks = feedbacks.filter(
      (feedback) => feedback.status === 'pending',
    )

    if (pendingFeedbacks.length === 0) {
      return
    }
    type FeedbackGroups = Record<string, Feedback[]>
    
    const feedbackGroups = pendingFeedbacks.reduce(
      (groups: FeedbackGroups, feedback) => {
        const groupKey = feedback.feature.trim().toLowerCase()

        return {
          ...groups,
          [groupKey]: [...(groups[groupKey] ?? []), feedback],
        }
      },
      {},
    )

    const today = new Date().toISOString().slice(0, 10)
    const generatedBacklogs: Backlog[] = Object.values(feedbackGroups).map(
      (feedbackGroup, index) => {
        const firstFeedback = feedbackGroup[0]
        const suggestions = feedbackGroup
          .map((feedback) => feedback.suggestion)
          .filter(Boolean)

        return {
          id: Date.now() + index,
          title: `${firstFeedback.feature} 개선 백로그`,
          problem: feedbackGroup
            .map((feedback) => feedback.painPoint)
            .join(' / '),
          requirement:
            suggestions.length > 0
              ? suggestions.join(' / ')
              : `${firstFeedback.feature} 사용 흐름을 개선합니다.`,
          priority:
            feedbackGroup.length >= 3
              ? 'High'
              : feedbackGroup.length === 2
                ? 'Medium'
                : 'Low',
          area: firstFeedback.feature,
          status: 'todo',
          relatedFeedbackIds: feedbackGroup.map((feedback) => feedback.id),
          createdAt: today,
          resolvedAt: null,
        }
      },
    )

    const backlogIdByFeedbackId = generatedBacklogs.reduce<Record<number, number>>(
      (idMap, backlog) => {
        backlog.relatedFeedbackIds.forEach((feedbackId) => {
          idMap[feedbackId] = backlog.id
        })

        return idMap
      },
      {},
    )

    setBacklogs((currentBacklogs) => [
      ...generatedBacklogs,
      ...currentBacklogs,
    ])
    setFeedbacks((currentFeedbacks) =>
      currentFeedbacks.map((feedback) => {
        const backlogId = backlogIdByFeedbackId[feedback.id]

        if (!backlogId) {
          return feedback
        }

        return {
          ...feedback,
          status: 'converted',
          backlogId,
        }
      }),
    )
  }

  const handleResolveBacklog = (backlogId: number) => {
    const targetBacklog = backlogs.find((backlog) => backlog.id === backlogId)

    if (!targetBacklog || targetBacklog.status === 'done') {
      return
    }

    const today = new Date().toISOString().slice(0, 10)
    const relatedFeedbackIds = targetBacklog.relatedFeedbackIds

    setBacklogs((currentBacklogs) =>
      currentBacklogs.map((backlog) => {
        if (backlog.id !== backlogId) {
          return backlog
        }

        return {
          ...backlog,
          status: 'done',
          resolvedAt: today,
        }
      }),
    )

    setFeedbacks((currentFeedbacks) =>
      currentFeedbacks.map((feedback) => {
        if (!relatedFeedbackIds.includes(feedback.id)) {
          return feedback
        }

        return {
          ...feedback,
          status: 'resolved',
        }
      }),
    )
  }

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
          <Route
            path="/feedback"
            element={<FeedbackFormPage onCreateFeedback={handleCreateFeedback} />}
          />
          <Route
            path="/my-feedbacks"
            element={<MyFeedbacksPage feedbacks={feedbacks} />}
          />
          <Route
            path="/admin"
            element={
              <AdminDashboardPage
                totalFeedbackCount={feedbacks.length}
                unresolvedFeedbackCount={unresolvedFeedbackCount}
                totalBacklogCount={backlogs.length}
                doneBacklogCount={doneBacklogCount}
              />
            }
          />
          <Route
            path="/admin/feedbacks"
            element={
              <AdminFeedbacksPage
                feedbacks={feedbacks}
                onGenerateBacklogs={handleGenerateBacklogs}
              />
            }
          />
          <Route
            path="/admin/backlogs"
            element={
              <AdminBacklogsPage
                backlogs={backlogs}
                onResolveBacklog={handleResolveBacklog}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
