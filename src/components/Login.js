import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();

    const handle_submit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        // console.log(json);
        if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token', json.auth_token);
            navigate("/");
            props.show_alert("Logged In Successfully", "success");
        }
        else{
            props.show_alert("Invalid Credentials", "danger");
        }
    }

    const on_change = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

  return (
    <div>
        <h2>Login</h2>
        <form className='my-4' onSubmit={handle_submit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} name='email' id="email" aria-describedby="emailHelp" onChange={on_change}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name='password' className="form-control" value={credentials.password} id="password" onChange={on_change}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login