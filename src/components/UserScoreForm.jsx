import React from "react";
import formatMMSS from "../utilities/format";

function UserScoreForm({ score, onSubmit }) {
  const submitScore = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="shadow-md">
      <h1>Congratulations!</h1>
      <p>You finished in {formatMMSS(score)} minutes. Use the form to submit your score!</p>
      <form action="#" onSubmit={submitScore}>
        <input type="text" id="username" />
        <button type="submit">Submit</button>
        <button type="reset">Cancel</button>
      </form>
    </div>
  );
}

export default UserScoreForm;
