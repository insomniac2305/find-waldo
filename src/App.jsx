import React, { useEffect, useState } from "react";
import Photo from "./components/Photo";

function App() {
  const [startTime, setStartTime] = useState(Date.now());
  const [timeLapsed, setTimeLapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLapsed(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatMMSS = (miliseconds) => {
    const minutes = Math.floor(miliseconds / 60000);
    const seconds = Math.floor(miliseconds / 1000) % 60;
    const formattedTime = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
    return formattedTime;
  };

  return (
    <>
      <div className="text-3xl font-bold">Find Waldo</div>
      <div>Time: {formatMMSS(timeLapsed)}</div>
      <div>
        <button
          onClick={() => {
            setStartTime(Date.now());
          }}
        >
          Start
        </button>
      </div>
      <Photo />
    </>
  );
}

export default App;
