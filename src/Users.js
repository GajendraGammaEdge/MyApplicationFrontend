import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      navigate('/login');
      return;
    }

    fetch('/api/pro/userinfo/getall', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(data => {
        if (data.users) setUsers(data.users);
        else setError(JSON.stringify(data));
      })
      .catch(e => setError(e.message));
  }, [navigate]);

  return (
    <div className="container">
      <h1>Users</h1>

      {error && <pre>{error}</pre>}

      <ul>
        {users.map((u, i) => (
          <li key={u.id || u.ID || i}>
            {u.name || u.Name} — {u.email || u.Email}
          </li>
        ))}
      </ul>
    </div>
  );
}
