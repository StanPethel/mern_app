import React, { useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';


function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let token = localStorage.getItem("token")
  console.log(token)
  async function handleSubmit(event) {
    event.preventDefault();
    let response = await axios.post("http://localhost:5001/login", {
      email: email,
      password: password,
    });
    console.log(response.data);
    // Save token in local storage and refresh page
    localStorage.setItem("token", response.data);
    window.location.href = "http://localhost:3000/";
  }

  return (
    <div className="container">
      <div class="row">
        <div class="col"><h3>Enter Your Information</h3></div>
        <div>
          <div className="card text-white bg-dark" style={{ width: "18rem" }}>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group" size="lg" controlId="email">
                  <label className="form-label">Email</label>
                  <input
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div className="form-group" size="lg" controlId="password">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div class="d-grid gap-2">
                  <Link to= '/'>
                   <button class="btn btn-secondary" type="button">
                     <h3>Login</h3>
                   </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;