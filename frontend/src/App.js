import React, { useState, useEffect } from 'react';
import './App.css';
import LoginModal from './components/LoginModal';
import { authService } from './services/auth';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleAuthSuccess = (data) => {
    setUser(data.user);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <div className="app">
      <nav className="nav">
        <div className="logo">MyApp</div>
        {user ? (
          <div className="user-menu">
            <span className="username">{user.username || user.email}</span>
            <button className="login-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="login-button" onClick={() => setShowLogin(true)}>
            Login
          </button>
        )}
      </nav>
      
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <main className="main">
        <section className="hero">
          <h1>Welcome to MyApp</h1>
          <p>A minimalistic platform for your needs</p>
        </section>

        <section className="features">
          <div className="feature-card">
            <h2>Simple</h2>
            <p>Clean and intuitive design</p>
          </div>
          <div className="feature-card">
            <h2>Fast</h2>
            <p>Lightning quick performance</p>
          </div>
          <div className="feature-card">
            <h2>Secure</h2>
            <p>Your data is protected</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Made with ❤️ in React</p>
      </footer>
    </div>
  );
}

export default App;