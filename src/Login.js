import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    const res = await fetch('/api/gogin/userinfo/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    setOutput(JSON.stringify(data, null, 2));

    if (res.ok && data.token) {
      localStorage.setItem('jwt', data.token);
      navigate('/users');
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={submit}>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>

      <pre>{output}</pre>
    </div>
  );
}
