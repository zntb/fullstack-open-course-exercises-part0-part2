import { useState } from 'react';

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({
  good,
  neutral,
  bad,
  total,
  average,
  positivePercentage,
}) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="neutral" value={average} />
      <StatisticsLine text="positive" value={positivePercentage} />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const totalFeedback = good + neutral + bad;
  const averageScore = totalFeedback ? (good - bad) / totalFeedback : 0;
  const positivePercentage = totalFeedback
    ? (good / totalFeedback) * 100 + ' %'
    : 0;

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <h2>statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={totalFeedback}
        average={averageScore}
        positivePercentage={positivePercentage}
      />
    </div>
  );
};

export default App;
