import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/dashboard");
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    await axios
      .post("http://127.0.0.1:8000/api/login", formData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);

        history.push("/dashboard");
        window.location.reload(true);
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };
  return (
    <div class="hold-transition login-page">
      <div class="login-box">
        <div class="card card-outline card-primary">
          <div class="card-header text-center">
            <Link to={""} class="h1">
              <b>Admin</b>LTE
            </Link>
          </div>
          <div class="card-body">
            <p class="login-box-msg">Silahkan Login</p>
            {validation.message && (
              <div className="alert alert-danger">{validation.message}</div>
            )}
            <form onSubmit={loginHandler}>
              <div class="input-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <button type="submit" class="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
