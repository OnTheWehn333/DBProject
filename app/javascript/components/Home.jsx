import React from "react";
import { ToastContainer } from "react-toastify";
import CreateTeam from "./CreateTeam";
import CreateGame from "./CreateGame";
import CreateResult from "./CreateResult";
import ViewAllTeams from "./ViewAllTeams";
import ViewAllResults from "./ViewAllResults";
import ViewAllResultsDate from "./ViewAllResultsDate";

const Home = (props) => {
  const [question, setQuestion] = React.useState(0);

  const Toggle = (num) => {
    setQuestion(num);
  };

  return (
    <div id="IsCreating">
      <ToastContainer />
      <button onClick={() => {Toggle(0)}} type="button" className="btn btn-primary">
        Add Team
      </button>
      <button onClick={() => {Toggle(1)}} type="button" className="btn btn-primary">
        Add Game
      </button>
      <button onClick={() => {Toggle(2)}} type="button" className="btn btn-primary">
        Add Result
      </button>
      <button onClick={() => {Toggle(3)}} type="button" className="btn btn-primary">
        View all teams
      </button>
      <button onClick={() => {Toggle(4)}} type="button" className="btn btn-primary">
        View all results for team
      </button>
      <button onClick={() => {Toggle(5)}} type="button" className="btn btn-primary">
        View all results on date
      </button>
      {question == 0 && <CreateTeam></CreateTeam>}
      {question == 1 && <CreateGame></CreateGame>}
      {question == 2 && <CreateResult></CreateResult>}
      {question == 3 && <ViewAllTeams></ViewAllTeams>}
      {question == 4 && <ViewAllResults></ViewAllResults>}
      {question == 5 && <ViewAllResultsDate></ViewAllResultsDate>}
    </div>
  );
};
export default Home;
