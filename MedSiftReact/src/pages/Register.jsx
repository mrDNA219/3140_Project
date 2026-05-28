import { useState } from 'react';
import { registerUser } from '../api';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { notify } from '../utils/notify';
import medSiftLogo from '/MedSiftDNA.svg';

function Register({navigate, setUserId, setUsername}) {
  const [newUser, setNewUser] = useState({ username: '', password: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await registerUser(newUser);
    if (!result.message) {
      window.localStorage.removeItem('token');
      setUserId(result.data._id);
      setUsername(result.data.username);
      window.localStorage.setItem('userId', result.data._id);
      notify.success('Account created! Please sign in.');
      navigate('/login');
    } else {
      notify.error(result.message);
    }
  };

  const handleGoogleLogin = async (response) => {
    const googleInfo = jwtDecode(response.credential);
    const result = await registerUser({ username: googleInfo.given_name, password: googleInfo.family_name });
    if (!result.message) {
      window.localStorage.removeItem('token');
      setUserId(result.data._id);
      setUsername(result.data.username);
      window.localStorage.setItem('userId', result.data._id);
      notify.success('Account created! Please sign in.');
      navigate('/login');
    } else {
      notify.error(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={medSiftLogo} className="auth-logo" alt="MedSift logo" />
        <h2>Create Account</h2>
        <p className="auth-subtitle">Choose a username and password to get started.</p>
        <form className="auth-form" onSubmit={handleRegister}>
          <input
            className="auth-input"
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <button className="auth-submit" type="submit">Create Account</button>
        </form>
        <div className="auth-divider">or</div>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => notify.error('Google sign-in failed.')}
        />
        <p className="auth-footer">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
