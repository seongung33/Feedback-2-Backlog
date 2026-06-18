import type { Feedback } from '../App'

type AdminFeedbacksPageProps = {
  feedbacks: Feedback[]
  onGenerateBacklogs: () => void
}

const feedbackStatusLabels: Record<Feedback['status'], string> = {
  pending: '접수됨',
  converted: '백로그 반영됨',
  resolved: '처리 완료',
}

function AdminFeedbacksPage({
  feedbacks,
  onGenerateBacklogs,
}: AdminFeedbacksPageProps) {
  const pendingFeedbackCount = feedbacks.filter(
    (feedback) => feedback.status === 'pending',
  ).length

  return (
    <section>
      <h2>전체 피드백</h2>
      <p>개발자 또는 운영자가 모든 사용자 피드백을 확인하는 화면입니다.</p>

      <button
        type="button"
        onClick={onGenerateBacklogs}
        disabled={pendingFeedbackCount === 0}
      >
        미처리 피드백으로 백로그 생성
      </button>

      {feedbacks.length === 0 ? (
        <p>등록된 피드백이 없습니다.</p>
      ) : (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback.id}>
              <strong>서비스 또는 기능: {feedback.feature}</strong>
              <p>불편했던 점: {feedback.painPoint}</p>
              <p>개선 점: {feedback.suggestion || '작성되지 않음'}</p>
              <p>제출일: {feedback.createdAt}</p>
              <p>처리 상태: {feedbackStatusLabels[feedback.status]}</p>
              <p>
                연결된 백로그 ID:{' '}
                {feedback.backlogId === null ? '없음' : feedback.backlogId}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default AdminFeedbacksPage
