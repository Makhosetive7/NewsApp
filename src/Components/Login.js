import React, { useState } from 'react';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation (you might want to add more robust validation)
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Check credentials (in a real app, you'd check against a database or use an authentication service)
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
      // Authentication successful, store credentials in localStorage
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      // Redirect to dashboard or any other authorized route
      history.push('/bookmarks');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;