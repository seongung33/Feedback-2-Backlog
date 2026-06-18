function FeedbackFormPage() {
  return (
    <section>
      <h2>피드백 작성</h2>
      <p>사용자가 서비스 사용 중 느낀 불편함과 개선 의견을 작성하는 화면입니다.</p>

      <form>
        <div>
          <label htmlFor="feature">서비스 또는 기능</label>
          <input id="feature" name="feature" type="text" />
        </div>

        <div>
          <label htmlFor="painPoint">불편했던 점</label>
          <textarea id="painPoint" name="painPoint" />
        </div>

        <div>
          <label htmlFor="suggestion">개선되었으면 하는 점</label>
          <textarea id="suggestion" name="suggestion" />
        </div>

        <button type="button">피드백 제출</button>
      </form>
    </section>
  )
}

export default FeedbackFormPage
