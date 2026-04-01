import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const payload = {
        email: form.email.trim(),
        password: form.password.trim()
      };

      const res = await axios.post("https://golf-charity-platform-iys3.onrender.com/login", payload);

      if (!res.data?.token || !res.data?.user) {
        const message = res.data?.message || "Login failed, please check your credentials.";
        alert(message);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login request error", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed, please try again later.";
      alert(message);
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
                <h2 className="card-title text-center">Login</h2>
                <form>
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
                    <button type="button" className="btn btn-primary" onClick={handleLogin}>
                      Login
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

export default Login;