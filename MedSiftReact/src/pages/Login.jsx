import { useState } from "react";
import { loginUser } from "../api";
import { notify } from "../utils/notify";
import medSiftLogo from '/MedSiftDNA.svg';

function Login({navigate, setUserId, setToken, setUsername}) {
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser(loginInfo);
    if (!result.message) {
      setUserId(result.data[0]._id);
      window.localStorage.setItem('userId', result.data[0]._id);
      setToken(result.token);
      window.localStorage.setItem('token', result.token);
      setUsername(result.data[0].username);
      window.localStorage.setItem('username', result.data[0].username);
      notify.success(`Welcome back, ${result.data[0].username}!`);
      navigate('/');
    } else {
      notify.error(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={medSiftLogo} className="auth-logo" alt="MedSift logo" />
        <h2>Sign In</h2>
        <p className="auth-subtitle">Welcome back — enter your credentials to continue.</p>
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            className="auth-input"
            type="text"
            placeholder="Username"
            value={loginInfo.username}
            onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
          />
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
