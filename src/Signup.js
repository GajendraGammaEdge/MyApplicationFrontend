import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    const res = await fetch('/api/gogin/userinfo/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    setOutput(JSON.stringify(data, null, 2));

    if (res.ok && (data.token || data.jwt_token)) {
      localStorage.setItem('jwt', data.token || data.jwt_token);
      navigate('/users');
    }
  }

  return (
    <div className="container">
      <h1>Sign up</h1>

      <form onSubmit={submit}>
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} required />

        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

        <button type="submit">Sign up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      <pre>{output}</pre>
    </div>
  );
}
