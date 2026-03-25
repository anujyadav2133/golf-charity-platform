import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("https://golf-charity-platform-iys3.onrender.com/signup", form);

      alert("Signup successful");

      navigate("/login");
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Signup</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nameInput"
                      placeholder="Enter your name"
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      placeholder="Enter email"
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="passwordInput"
                      placeholder="Password"
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="d-grid">
                    <button type="button" className="btn btn-primary" onClick={handleSignup}>
                      Signup
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;