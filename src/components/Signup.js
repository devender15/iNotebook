import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {

  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  let navigate = useNavigate();

  const handle_submit = async (e)=>{
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    // console.log(json);
    if(json.success){
        // save the auth token and redirect
        localStorage.setItem('token', json.auth_token);
        navigate("/");
        props.show_alert("Account Created Successfully", "success");
    }
    else{
        props.show_alert("Check your Credentials", "danger");
    }
  }

  const on_change = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }


  return (
    <div className="container">
      <h2>Signup</h2>
      <form className="my-4" onSubmit={handle_submit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            onChange={on_change}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={on_change}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={on_change}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={on_change}
            required
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
