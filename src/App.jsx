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
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <header className="sticky top-0 flex items-center justify-between bg-zinc-900 p-4 shadow-md">
        <div className="text-3xl font-bold tracking-tighter"><a href="/">Find the Character</a></div>
        {phase === PLAYING && (
          <span className="w-16 text-2xl font-semibold tracking-tighter">{formatMMSS(timeLapsed)}</span>
        )}
      </header>
      <main className="flex flex-1 items-center justify-center">
        {phase === PLAYING && <Photo onCompletion={endGame} />}
        {phase === INIT && (
          <div className="flex flex-col gap-2">
            <button className="rounded-lg bg-orange-800 hover:bg-orange-700 active:bg-orange-600 px-8 py-4 text-2xl font-semibold" onClick={startGame}>
              Start
            </button>
            <button
              className="rounded-lg bg-orange-400/10 hover:bg-orange-400/20 active:bg-orange-400/30 text-orange-400 px-8 py-4 text-2xl font-semibold"
              onClick={() => setPhase(BOARD)}
            >
              Show Leaderboard
            </button>
          </div>
        )}
        {phase === FINISHED && (
          <UserScoreForm score={timeLapsed} onSubmit={() => setPhase(BOARD)} onCancel={() => setPhase(INIT)} />
        )}
        {phase === BOARD && <ScoreBoard />}
      </main>
    </div>
  );
}

export default App;
