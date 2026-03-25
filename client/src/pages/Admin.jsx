import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Admin() {
  const [users, setUsers] = useState([]);
  const [scores, setScores] = useState([]);
  const [winners, setWinners] = useState([]);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    fetchUsers();
    fetchScores();
    fetchWinners();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/admin/users");
    setUsers(res.data);
  };

  const fetchScores = async () => {
    const res = await axios.get("http://localhost:5000/admin/scores");
    setScores(res.data);
  };

  const fetchWinners = async () => {
    const res = await axios.get("http://localhost:5000/admin/winners");
    setWinners(res.data);
  };

  const markPayout = async () => {
    await axios.post("http://localhost:5000/admin/payout");
    alert("Payout completed");
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h2>Admin Dashboard</h2>

        <ul className="nav nav-tabs mt-4">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>Users</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "scores" ? "active" : ""}`} onClick={() => setActiveTab("scores")}>Scores</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "winners" ? "active" : ""}`} onClick={() => setActiveTab("winners")}>Winners</button>
          </li>
        </ul>

        <div className="tab-content mt-4">
          {activeTab === "users" && (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "scores" && (
            <table className="table">
              <thead>
                <tr>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score) => (
                  <tr key={score.id}>
                    <td>{score.score}</td>
                    <td>{new Date(score.played_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "winners" && (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Result</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {winners.map((winner, index) => (
                    <tr key={index}>
                      <td>{winner.user}</td>
                      <td>{winner.result}</td>
                      <td>{winner.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn btn-primary" onClick={markPayout}>Mark Payout Completed</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;