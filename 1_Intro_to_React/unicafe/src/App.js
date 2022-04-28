import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good == 0 && neutral == 0 && bad == 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  } else {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text="Good" value={good} />
            <StatisticsLine text="Neutral" value={neutral} />
            <StatisticsLine text="Bad" value={bad} />
            <StatisticsLine text="Total" value={computeTotal(good, neutral, bad)} />
            <StatisticsLine text="Average" value={computeAverage(good, neutral, bad)} />
            <StatisticsLine text="Positive" value={computePositivePercent(good, neutral, bad) + " %"} />
          </tbody>
        </table>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <p>How did you enjoy your meal?</p>
      <Button onClick={incrementGood} text="Great!" />
      <Button onClick={incrementNeutral} text="Okay" />
      <Button onClick={incrementBad} text="Awful" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

const computeTotal = (good, neutral, bad) => {
  return (good + neutral + bad)
}

const computeAverage = (good, neutral, bad) => {
  return (good - bad) / (good + neutral + bad)
}

const computePositivePercent = (good, neutral, bad) => {
  return 100 * good / (good + neutral + bad)
}

export default App