function MyFeedbacksPage() {
  return (
    <section>
      <h2>내 피드백</h2>
      <p>사용자가 작성한 피드백과 처리 상태를 확인하는 화면입니다.</p>

      <ul>
        <li>접수됨: 백로그로 전환되기 전의 피드백</li>
        <li>백로그 반영됨: 개발 백로그와 연결된 피드백</li>
        <li>처리 완료: 연결된 백로그가 해결된 피드백</li>
      </ul>
    </section>
  )
}

export default MyFeedbacksPage
