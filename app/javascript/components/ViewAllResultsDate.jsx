
import React from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

const ViewAllResultsDate = (props) => {
  const [results, setResults] = React.useState([]);
  const [date, setDate] = React.useState(1);

  const getResults = async () => {
    let res = await fetch(`http://localhost:3000/result/getByDate?date=${date}`);
    res = await res.json();
    if (res["HasError"] == false) {
      setResults(res["Results"]);
    } else {
      toast.error(`Error, ${res["Message"]} `);
    }
  };
  const ChangeDate = (event) => {
    setDate(event.target.value);
  };

  const mapResults = (results) => {
    return results.map((result) => {
      return (
        <div>
          <p>GameId: {result.Game.id}</p>
          <p>Location: {result.Game.location}</p>
          {result.Result.team1_score == result.Result.team2_score && <p>Tied!</p>}
          {result.Result.team1_score > result.Result.team2_score && <p>Winner!</p>}
          <p>Team1: {result.Team1.name} ({result.Team1.nickname}): {result.Team1.rank}</p>
          <p>Team1 Score: {result.Result.team1_score}</p>
          {result.Result.team1_score < result.Result.team2_score && <p>Winner!</p>}
          <p>Team2: {result.Team2.name} ({result.Team2.nickname}): {result.Team2.rank}</p>
          <p>Team2 Score: {result.Result.team2_score}</p>
          <br></br>
        </div>
      );
    });
  };
  return (
    <div id="ViewAllResultsDate">
      <label htmlFor="example-date-input" className="col-2 col-form-label">
        Date
      </label>
      <div className="col-10">
        <input
          className="form-control"
          type="date"
          value={date}
          id="example-date-input"
          onChange={ChangeDate}
        ></input>
      </div>
      <button id="sendQuery" type="button" className="btn btn-primary" onClick={getResults}>Get Teams Results</button>
      {mapResults(results)}
    </div>
  );
};

export default ViewAllResultsDate;
