import React from "react";
import { toast } from "react-toastify";

const CreateTeam = () => {
  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [rank, setRank] = React.useState("");

  const ChangeName = (event) => {
    setName(event.target.value);
  };

  const ChangeNickname = (event) => {
    setNickname(event.target.value);
  };
  const ChangeRank = (event) => {
    setRank(event.target.value);
  };

  const SendTeam = () => {
    let data = { name: name, nickname: nickname, rank: rank };
    let json = JSON.stringify(data);
    fetch("http://localhost:3000/team", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then(async (res) => {
      let json = await res.json();
      let error = json["HasError"];
      let message = json["Message"];
      if (error) {
        toast.error(`Failed to save, ${message}`);
      } else {
        toast.info("Saved");
      }
    });
  };

  return (
    <div id="CreateTeam">
      <div className="mb-3">
        <label htmlFor="inputName" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          onChange={ChangeName}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="inputNickname" className="form-label">
          NickName
        </label>
        <input
          type="text"
          className="form-control"
          id="inputNickname"
          onChange={ChangeNickname}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="inputRank" className="form-label">
          Rank
        </label>
        <input
          type="text"
          className="form-control"
          id="inputRank"
          onChange={ChangeRank}
        ></input>
      </div>
      <button type="button" className="btn btn-primary" onClick={SendTeam}>
        Create
      </button>
    </div>
  );
};
export default CreateTeam;
