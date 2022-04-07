import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { api } from './api';
import './App.css';
import LoginForm from './components/LoginForm';
import Vote from './components/Vote';

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    async function loadCurrentUser() {
      const user = await api.account.get();
      setUser(user);
    }

    loadCurrentUser();
  }, []);

  return (
    <Routes>
      <Route
        path="vote"
        element={
          <div className="app-container">
            <div className="content">{user ? <Vote user={user} /> : ''}</div>
          </div>
        }
      />
      <Route
        path="/"
        element={
          <div className="app-container">
            <div className="content">
              <span className="lwj-title">Learn With Jason</span>
              <span className="appwrite-vote">Entry to Vote</span>
              <LoginForm setUser={setUser} />
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
