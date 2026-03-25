import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");
  const [scores, setScores] = useState([]);
  const [drawResult, setDrawResult] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchScores = async () => {
    const res = await axios.get(`http://localhost:5000/scores/${user.id}`);
    setScores(res.data);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleScore = async () => {
    await axios.post("http://localhost:5000/add-score", {
      user_id: user.id,
      score: Number(score),
      played_at: date
    });

    alert("Score added successfully");

    fetchScores();
  };

  const handleDraw = async () => {
    const res = await axios.get("http://localhost:5000/run-draw");
    setDrawResult(res.data.drawNumbers);
  };

  return (
    <div>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 bg-light p-4">
            <h2 className="mb-4">Dashboard</h2>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user?.name}</h5>
                <p className="card-text">{user?.email}</p>
                <p className="card-text">Subscription: <span className="badge bg-success">Active</span></p>
              </div>
            </div>

            <hr />

            <h3>Add Golf Score</h3>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Enter Score"
                onChange={(e) => setScore(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleScore}>Add Score</button>
          </div>
          <div className="col-md-9 p-4">
            <h3>Latest Scores</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((item) => (
                  <tr key={item.id}>
                    <td>{item.score}</td>
                    <td>{new Date(item.played_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr />

            <h3>Select Charity</h3>
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Cancer Care Trust</h5>
                    <button className="btn btn-sm btn-outline-primary">Select</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Child Education Fund</h5>
                    <button className="btn btn-sm btn-outline-primary">Select</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Green Earth Mission</h5>
                    <button className="btn btn-sm btn-outline-primary">Select</button>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <h3>Monthly Draw</h3>
            <button className="btn btn-success" onClick={handleDraw}>Run Draw</button>
            <p className="mt-3 fs-4">{drawResult.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;