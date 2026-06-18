import type { Backlog } from '../App'

type AdminBacklogsPageProps = {
  backlogs: Backlog[]
  onResolveBacklog: (backlogId: number) => void
}

const backlogStatusLabels: Record<Backlog['status'], string> = {
  todo: '해야 할 작업',
  in_progress: '진행 중',
  done: '해결 완료',
}

function AdminBacklogsPage({
  backlogs,
  onResolveBacklog,
}: AdminBacklogsPageProps) {
  return (
    <section>
      <h2>백로그</h2>
      <p>생성된 제품 백로그를 확인하고 해결 완료 처리하는 화면입니다.</p>

      {backlogs.length === 0 ? (
        <p>생성된 백로그가 없습니다.</p>
      ) : (
        <ul>
          {backlogs.map((backlog) => (
            <li key={backlog.id}>
              <strong>{backlog.title}</strong>
              <p>문제 요약: {backlog.problem}</p>
              <p>요구사항: {backlog.requirement}</p>
              <p>우선순위: {backlog.priority}</p>
              <p>담당 영역: {backlog.area}</p>
              <p>연결된 피드백 수: {backlog.relatedFeedbackIds.length}</p>
              <p>백로그 상태: {backlogStatusLabels[backlog.status]}</p>
              <p>해결 완료일: {backlog.resolvedAt ?? '미완료'}</p>
              <button
                type="button"
                onClick={() => onResolveBacklog(backlog.id)}
                disabled={backlog.status === 'done'}
              >
                해결 완료
              </button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default AdminBacklogsPage
