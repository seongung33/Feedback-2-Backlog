import type { Feedback } from '../App'

type MyFeedbacksPageProps = {
  feedbacks: Feedback[]
}

const feedbackStatusLabels: Record<Feedback['status'], string> = {
  pending: '접수됨',
  converted: '백로그 반영됨',
  resolved: '처리 완료',
}

function MyFeedbacksPage({ feedbacks }: MyFeedbacksPageProps) {
  return (
    <section>
      <h2>내 피드백</h2>
      <p>사용자가 작성한 피드백과 처리 상태를 확인하는 화면입니다.</p>

      {feedbacks.length === 0 ? (
        <p>아직 작성한 피드백이 없습니다.</p>
      ) : (
        <ul>
          {feedbacks.map((feedback) => (
            <div key={feedback.id}>
              <strong>서비스 또는 기능 : {feedback.feature}</strong>
              <p>불편했던 점 :{feedback.painPoint}</p>
              <p>개선 점 :{feedback.suggestion}</p>
              <p>제출일: {feedback.createdAt}</p>
              <p>처리 상태: {feedbackStatusLabels[feedback.status]}</p>
              <hr />
            </div>
          ))}
        </ul>
      )}
    </section>
  )
}

export default MyFeedbacksPage
