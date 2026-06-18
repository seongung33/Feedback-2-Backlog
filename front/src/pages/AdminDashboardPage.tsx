type AdminDashboardPageProps = {
  totalFeedbackCount: number
  unresolvedFeedbackCount: number
  totalBacklogCount: number
  doneBacklogCount: number
}

function AdminDashboardPage({
  totalFeedbackCount,
  unresolvedFeedbackCount,
  totalBacklogCount,
  doneBacklogCount,
}: AdminDashboardPageProps) {
  return (
    <section>
      <h2>관리자 대시보드</h2>
      <p>개발자 또는 운영자가 전체 피드백과 백로그 현황을 요약해서 확인하는 화면입니다.</p>

      <ul>
        <li>전체 피드백 수: {totalFeedbackCount}</li>
        <li>미처리 피드백 수: {unresolvedFeedbackCount}</li>
        <li>생성된 백로그 수: {totalBacklogCount}</li>
        <li>완료된 백로그 수: {doneBacklogCount}</li>
      </ul>
    </section>
  )
}

export default AdminDashboardPage
