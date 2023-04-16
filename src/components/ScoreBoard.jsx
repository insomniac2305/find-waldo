import { collection, getDocs } from "firebase/firestore";
import database from "../firebase";
import React, { useEffect, useState } from "react";
import formatMMSS from "../utilities/format";

function ScoreBoard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const storedScores = await getDocs(collection(database, "userScores"));
      const scoreData = storedScores.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setScores(scoreData);
    };
    fetchScores();
  }, []);

  const scoreTableRows = scores.map((score) => {
    return (
      <tr key={score.id}>
        <td>{score.user}</td>
        <td>{formatMMSS(score.score)}</td>
        <td>{new Date(score.timestamp).toLocaleDateString()}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Score</th>
          <th>Submission Date</th>
        </tr>
      </thead>
      <tbody>{scoreTableRows}</tbody>
    </table>
  );
}

export default ScoreBoard;
