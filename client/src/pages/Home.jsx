import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Navbar />

      <div className="container-fluid bg-light text-dark p-5">
        <div className="container bg-light p-5">
          <h1 className="display-4 fw-bold">
            Play Golf. Win Rewards. Support Charity.
          </h1>

          <p className="lead mt-4">
            Track your golf scores, enter monthly draws,
            and contribute to meaningful causes.
          </p>

          <div className="mt-5">
            <Link to="/signup" className="btn btn-primary btn-lg me-3">
              Subscribe Now
            </Link>

            <Link to="/login" className="btn btn-secondary btn-lg">
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="container p-5">
        <h2 className="text-center mb-5">Featured Charities</h2>

        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Cancer Care Trust</h5>
                <p className="card-text">
                  Supporting cancer patients and their families.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Child Education Fund</h5>
                <p className="card-text">
                  Providing quality education to underprivileged children.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Green Earth Mission</h5>
                <p className="card-text">
                  Working towards a greener and more sustainable planet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;