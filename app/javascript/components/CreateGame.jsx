import React from "react";
import { toast } from "react-toastify";

const CreateGame = () => {
  const [rank1, setRank1] = React.useState("");
  const [rank2, setRank2] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [date, setDate] = React.useState();

  const ChangeRank1 = (event) => {
    setRank1(event.target.value);
  };

  const ChangeRank2 = (event) => {
    setRank2(event.target.value);
  };
  const ChangeLocation = (event) => {
    setLocation(event.target.value);
  };
  const ChangeDate = (event) => {
    console.log(event.target.value);
    setDate(event.target.value);
  };

  const SendGame = () => {
    console.log(date);
    let data = { rank1: rank1, rank2: rank2, location: location, date: date };
    let json = JSON.stringify(data);
    fetch("http://localhost:3000/game", {
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
  };

  return (
    <div id="CreateGame">
      <div className="mb-3">
        <label htmlFor="inputRank1" className="form-label">
          Rank1
        </label>
        <input
          type="text"
          className="form-control"
          id="inputRank1"
          onChange={ChangeRank1}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="inputRank2" className="form-label">
          Rank2
        </label>
        <input
          type="text"
          className="form-control"
          id="inputRank2"
          onChange={ChangeRank2}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="inputLocation" className="form-label">
          Location
        </label>
        <input
          type="text"
          className="form-control"
          id="inputLocation"
          onChange={ChangeLocation}
        ></input>
      </div>
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
      <button type="button" className="btn btn-primary" onClick={SendGame}>
        Create
      </button>
    </div>
  );
};
export default CreateGame;
