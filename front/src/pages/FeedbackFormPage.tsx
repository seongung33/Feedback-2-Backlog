import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CreateFeedbackInput } from '../App'

type FeedbackFormPageProps = {
  onCreateFeedback: (input: CreateFeedbackInput) => void
}

function FeedbackFormPage({ onCreateFeedback }: FeedbackFormPageProps) {
  const navigate = useNavigate()
  const [feature, setFeature] = useState('')
  const [painPoint, setPainPoint] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedFeature = feature.trim()
    const trimmedPainPoint = painPoint.trim()
    const trimmedSuggestion = suggestion.trim()

    if (!trimmedFeature || !trimmedPainPoint) {
      setErrorMessage('서비스 또는 기능과 불편했던 점을 반드시 입력해 주세요.')
      return
    }

    onCreateFeedback({
      feature: trimmedFeature,
      painPoint: trimmedPainPoint,
      suggestion: trimmedSuggestion,
    })

    setErrorMessage('')
    setFeature('')
    setPainPoint('')
    setSuggestion('')
    navigate('/my-feedbacks')
  }

  return (
    <section>
      <h2>피드백 작성</h2>
      <p>사용자가 서비스 사용 중 느낀 불편함과 개선 의견을 작성하는 화면입니다.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="feature">서비스 또는 기능</label>
          <input
            id="feature"
            name="feature"
            type="text"
            value={feature}
            onChange={(event) => setFeature(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="painPoint">불편했던 점</label>
          <textarea
            id="painPoint"
            name="painPoint"
            value={painPoint}
            onChange={(event) => setPainPoint(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="suggestion">개선되었으면 하는 점</label>
          <textarea
            id="suggestion"
            name="suggestion"
            value={suggestion}
            onChange={(event) => setSuggestion(event.target.value)}
          />
        </div>

        <button type="submit">피드백 제출</button>
        {errorMessage && <p role="alert">{errorMessage}</p>}
      </form>
    </section>
  )
}

export default FeedbackFormPage
