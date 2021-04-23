import React from "react";
import { toast } from "react-toastify";

const CreateResult = () => {
  const [game, setGame] = React.useState("");
  const [team1, setTeam1] = React.useState("");
  const [team2, setTeam2] = React.useState("");
  const [score1, setScore1] = React.useState("");
  const [score2, setScore2] = React.useState("");

  const ChangeGame = (event) => {
    setGame(event.target.value);
  };

  const ChangeTeam1 = (event) => {
    setTeam1(event.target.value);
  };
  const ChangeTeam2 = (event) => {
    setTeam2(event.target.value);
  };
  const ChangeScore1 = (event) => {
    setScore1(event.target.value);
  };
  const ChangeScore2 = (event) => {
    setScore2(event.target.value);
  };

  const SendResult = () => {
    let data = {
      game: game,
      team1: team1,
      team2: team2,
      score1: score1,
      score2: score2,
    };
    let json = JSON.stringify(data);
    fetch("http://localhost:3000/result", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: json,
    })
      .then(async (res) => {
        let json = await res.json();
        let error = json["HasError"];
        let message = json["Message"];
        if (error) {
          toast.error(`Failed to save, ${message}`);
        } else {
          toast.info("Saved");
        }
      })
      .then((json) => {
      });
  };

  return (
    <div id="CreateResult">
      <div className="mb-3">
        <label htmlFor="inputGame" className="form-label">
          GameID
        </label>
        <input
          type="text"
          className="form-control"
          id="inputGame"
          onChange={ChangeGame}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="inputTeam1" className="form-label">
          Team1ID
        </label>
        <input
          type="text"
          className="form-control"
          id="inputTeam1"
          onChange={ChangeTeam1}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="inputTeam2" className="form-label">
          Team2ID
        </label>
        <input
          type="text"
          className="form-control"
          id="inputTeam2"
          onChange={ChangeTeam2}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="inputScore1" className="form-label">
          Team1 Score
        </label>
        <input
          type="text"
          className="form-control"
          id="inputScore1"
          onChange={ChangeScore1}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="inputScore2" className="form-label">
          Team2 Score
        </label>
        <input
          type="text"
          className="form-control"
          id="inputScore2"
          onChange={ChangeScore2}
        ></input>
      </div>
      <button type="button" className="btn btn-primary" onClick={SendResult}>
        Create
      </button>
    </div>
  );
};
export default CreateResult;
