import React from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

const ViewAllResults = (props) => {
  const [results, setResults] = React.useState([]);
  const [team, setTeam] = React.useState([]);
  const [id, setId] = React.useState(1);

  const getResults = async () => {
    let res = await fetch(`http://72.204.89.165:2999/result/getByTeamId?id=${id}`);
    res = await res.json();
    if (res["HasError"] == false) {
      setResults(res["Results"]);
      setTeam(res["Team"]);
    } else {
      toast.error(`Error, ${res["Message"]} `);
    }
  };
  const ChangeId = (event) => {
    setId(event.target.value);
  };

  const mapResults = (results) => {
    return results.map((result) => {
      return (
        <div>
          <p>GameId: {result.Game.id}</p>
          <p>Team1: {result.Team1.name} ({result.Team1.nickname}): {result.Team1.rank}</p>
          <p>Team1 Score: {result.Result.team1_score}</p>
          <p>Team2: {result.Team2.name} ({result.Team2.nickname}): {result.Team2.rank}</p>
          <p>Team2 Score: {result.Result.team2_score}</p>
          <br></br>
        </div>
      );
    });
  };
  return (
    <div id="ViewAllResults">
      <div className="mb-3">
        <label htmlFor="inputID" className="form-label">
          Team ID:
        </label>
        <input
          type="text"
          className="form-control"
          id="inputID"
          onChange={ChangeId}
        ></input>
        <button
          id="sendQuery"
          type="button"
          className="btn btn-primary"
          onClick={getResults}
        >
          Get Teams Results
        </button>
      </div>
      <p>Quried Team:</p>
      <p>Name: {team.name}</p>
      <p>Nickname: {team.nickname}</p>
      <p>Rank: {team.rank}</p>
      <br></br>
      {mapResults(results)}
    </div>
  );
};

export default ViewAllResults;
