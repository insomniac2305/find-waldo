import React, { useEffect, useState } from "react";
import Photo from "./components/Photo";
import UserScoreForm from "./components/UserScoreForm";
import formatMMSS from "./utilities/format";
import ScoreBoard from "./components/ScoreBoard";

const INIT = 1;
const PLAYING = 2;
const FINISHED = 3;
const BOARD = 4;

function App() {
  const [phase, setPhase] = useState(INIT);
  const [startTime, setStartTime] = useState(null);
  const [timeLapsed, setTimeLapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (phase === PLAYING) {
      interval = setInterval(() => {
        setTimeLapsed(Date.now() - startTime);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [phase, startTime]);

  const startGame = () => {
    setStartTime(Date.now());
    setPhase(PLAYING);
  };

  const endGame = () => {
    setPhase(FINISHED);
  };

  return (
    <>
      <div className="text-3xl font-bold">Find Waldo</div>
      {phase === PLAYING && <div>Time: {formatMMSS(timeLapsed)}</div>}
      {phase === PLAYING && <Photo onCompletion={endGame} />}
      {phase === INIT && (
        <div>
          <button onClick={startGame}>Start</button>
          <button onClick={() => setPhase(BOARD)}>Show Leaderboard</button>
        </div>
      )}
      {phase === FINISHED && (
        <UserScoreForm score={timeLapsed} onSubmit={() => setPhase(BOARD)} onCancel={() => setPhase(INIT)}/>
      )}
      {phase === BOARD && (
        <ScoreBoard />
      )}
    </>
  );
}

export default App;
