import { useState } from 'react';

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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positivePercentage}</p>
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
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
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
