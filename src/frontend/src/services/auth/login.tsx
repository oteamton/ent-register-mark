import React, { useState } from "react";
import axios from "axios";
import "../../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="container mt-5">
      <img src="" alt="EnT Logo" />
      <h3>Sign in</h3>
      <div className="inner-container">
        <hr />
        <form onSubmit={handleLogin}>
          {/* email  */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@ex.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {!validateEmail(email) ? (
              <span className="error-message">Please enter a valid email.</span>
            ) : null}
          </div>
          {/* password  */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
          <button type="button" className="btn btn-primary">
            Forgot password
          </button>
          {/* Sign up */}
          <div className="mb-3">
            <p>Don't have an account?</p>
            <button type="button" className="btn btn-link">
              Join us!
            </button>
          </div>
        </form>
        {/* {validationMessage && <p>{validationMessage}</p>} */}
      </div>
    </div>
  );
}
export default Login;
