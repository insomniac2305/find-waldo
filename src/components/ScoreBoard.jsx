import { collection, getDocs, orderBy, query } from "firebase/firestore";
import database from "../firebase";
import React, { useEffect, useState } from "react";
import formatMMSS from "../utilities/format";

function ScoreBoard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const scoreRef = collection(database, "userScores");
      const scoreQuery = query(scoreRef, orderBy("score"));
      const storedScores = await getDocs(scoreQuery);
      const scoreData = storedScores.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setScores(scoreData);
    };
    fetchScores();
  }, []);

  const scoreTableRows = scores.map((score, index) => {
    return (
      <tr key={score.id} className="border-b border-zinc-600 bg-zinc-800 last:border-none">
        <td className="px-6 py-4 text-right">{index + 1}</td>
        <th scope="row" className="whitespace-nowrap px-6 py-4 font-semibold text-white">
          {score.user}
        </th>
        <td className="px-6 py-4 text-center">{formatMMSS(score.score)}</td>
        <td className="px-6 py-4">{new Date(score.timestamp).toLocaleDateString()}</td>
      </tr>
    );
  });

  return (
    <table className="text-left text-zinc-300">
      <thead className="bg-zinc-700 text-sm uppercase text-zinc-300">
        <tr>
          <th className="px-6 py-3">#</th>
          <th className="px-6 py-3">Username</th>
          <th className="px-6 py-3">Score</th>
          <th className="px-6 py-3">Submission Date</th>
        </tr>
      </thead>
      <tbody>{scoreTableRows}</tbody>
    </table>
  );
}

export default ScoreBoard;
