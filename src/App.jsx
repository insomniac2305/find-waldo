import React, { useEffect, useState } from "react";
import Photo from "./components/Photo";
import UserScoreForm from "./components/UserScoreForm";
import formatMMSS from "./utilities/format";

function App() {
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeLapsed, setTimeLapsed] = useState(0);
  const [showBoard, setShowBoard] = useState(false);

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        setTimeLapsed(Date.now() - startTime);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [started, startTime]);

  const startGame = () => {
    setStartTime(Date.now());
    setStarted(true);
  };

  const endGame = () => {
    setStarted(false);
    console.log("Finished in " + formatMMSS(timeLapsed));
  };

  return (
    <>
      <div className="text-3xl font-bold">Find Waldo</div>
      {started && <div>Time: {formatMMSS(timeLapsed)}</div>}
      {started && <Photo onCompletion={endGame} />}
      {!started && (
        <div>
          <button onClick={startGame}>Start</button>
        </div>
      )}
      {!started && timeLapsed > 0 && !showBoard && (
        <UserScoreForm score={timeLapsed} onSubmit={() => setShowBoard(true)} />
      )}
    </>
  );
}

export default App;
