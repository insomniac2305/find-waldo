import React, { useState } from "react";
import formatMMSS from "../utilities/format";
import { collection, addDoc } from "firebase/firestore";
import database from "../firebase";

function UserScoreForm({ score, onSubmit, onCancel }) {
  const [userName, setUserName] = useState("");

  const submitScore = (e) => {
    e.preventDefault();
    addDoc(collection(database, "userScores"), {
      user: userName,
      score: score,
      timestamp: Date.now(),
    });
    onSubmit();
  };

  return (
    <div className="shadow-md">
      <h1>Congratulations!</h1>
      <p>You finished in {formatMMSS(score)} minutes. Use the form to submit your score!</p>
      <form action="#" onSubmit={submitScore} onReset={onCancel}>
        <label htmlFor="username">Your name:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type="submit">Submit</button>
        <button type="reset">Cancel</button>
      </form>
    </div>
  );
}

export default UserScoreForm;
