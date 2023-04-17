import React, { useState } from "react";
import formatMMSS from "../utilities/format";
import { collection, addDoc } from "firebase/firestore";
import database from "../firebase";
import ProfanityFilter from "leo-profanity";

function UserScoreForm({ score, onSubmit, onCancel }) {
  const [userName, setUserName] = useState("");

  const submitScore = (e) => {
    e.preventDefault();
    addDoc(collection(database, "userScores"), {
      user: ProfanityFilter.clean(userName, "*", 1),
      score: score,
      timestamp: Date.now(),
    });
    onSubmit();
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-zinc-900 p-4 text-lg shadow-md">
      <h1 className="self-center text-3xl font-bold tracking-tighter text-orange-400">Congratulations!</h1>
      <p className="text-center text-zinc-300">
        You finished in <span className="font-semibold text-orange-400">{formatMMSS(score)} minutes</span>.
        <br /> Use the form below to submit your score!
      </p>
      <form className="flex flex-col gap-1" action="#" onSubmit={submitScore} onReset={onCancel}>
        <label className="text-sm font-semibold uppercase tracking-wider" htmlFor="username">
          Your name
        </label>
        <input
          className="rounded-lg bg-zinc-800 p-2 outline-none hover:bg-zinc-700 focus:outline-1 focus:outline-zinc-400"
          type="text"
          id="username"
          name="username"
          value={userName}
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className="mt-4 flex justify-center gap-2">
          <button
            className="w-32 rounded-lg bg-orange-800 py-2 text-lg font-semibold hover:bg-orange-700 active:bg-orange-600"
            type="submit"
          >
            Submit
          </button>
          <button
            className="w-32 rounded-lg bg-orange-400/10 py-2 text-lg font-semibold text-orange-400 hover:bg-orange-400/20 active:bg-orange-400/30"
            type="reset"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default UserScoreForm;
