import { useState } from 'react'

const StaticLine = ({ text, value }) => {
  return (
    <div>
      <td>{text}</td>
      <td>{value}</td>
    </div>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StaticLine text="good" value={good} />
          <StaticLine text="neutral" value={neutral} />
          <StaticLine text="bad" value={bad} />
          <StaticLine text="all" value={all} />
          <StaticLine text="average" value={average} />
          <StaticLine text="positive" value={`${positive} %`} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      {good || neutral || bad ? <Statistics good={good} neutral={neutral} bad={bad} /> : <p>No feedback given</p>}
    </div>
  )
}

export default App