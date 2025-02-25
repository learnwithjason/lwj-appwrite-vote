import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import './LoginForm.css';

export default function LoginForm({ setUser }) {
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    const session = await api.account.createAnonymousSession();
    setUser(session);

    navigate('/vote');
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={login}>
        <p className="login-name">
          <label htmlFor="name">Name (optional)</label>

          <input type="text" id="name" name="name" placeholder="Enter Name" />
        </p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
