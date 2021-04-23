import React from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from "uuid";

const ViewAllTeams = (props) => {
  const [teams, setTeams] = React.useState([]);
  
  React.useEffect(() => {
    getTeams();
  }, [])

  const getTeams = async() => {
    let res = await fetch("http://localhost:3000/team");
    res = await res.json();
    if (res["HasError"] == false) {
      setTeams(res["Teams"])
    } else {
      toast.error(`Error, ${res["Message"]}`);
    }
  }

  const mapTeams = (teams) => {
    if (teams.length == 0) {
      return <div>teams are empty</div>
    }
    return teams.map((team) => {
      return (
        <div>
          <p>id: {team.id}</p>
          <p>name: {team.name}</p>
          <p>nickname: {team.nickname} </p>
          <p>rank: {team.rank}</p>
          <br></br>
        </div>
      );
    });
  }
  return (
    <div id="ViewAllTeams">
      {mapTeams(teams)}
    </div>
  )
}

export default ViewAllTeams;