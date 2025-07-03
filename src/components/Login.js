import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    
    const [credentials, setCredentials] = useState({email: '', password: '' });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
        }),
        });
        const json = await response.json();
        console.log(json);
        
        if(json.success){
            //Save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate('/')
        }
        else{
            alert("Invalid Credentials")
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#e3e3e3' }}>
        <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '1rem' }}>
            <h2 className="text-center mb-4">Login to Your Account</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                placeholder="Enter your email"
                required
                />                
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">Password</label>
                <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                placeholder="Enter your password"
                required
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <p className="text-center mt-3 mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
            Don’t have an account? <Link to="/signup" className="text-decoration-none">SignUp</Link>
            </p>
        </div>
        </div>
    );
    };

    export default Login;
