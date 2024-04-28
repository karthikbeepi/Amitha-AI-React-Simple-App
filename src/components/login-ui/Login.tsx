import React, { useState } from "react";
import "./Login.css";

const Login: React.FC = () => {
  const [inputToken, setInputToken] = useState("");

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputToken(event.target.value);
  };

  const handleSetToken = () => {
    sessionStorage.setItem("authToken", inputToken);
    window.location.reload();
  };

  return (
    <div className="login-container">
      <h2>Contact amithabeepi@gmail.com to get your auth token.</h2>

      <br />
      <br />
      <h1>Enter Auth token:</h1>
      <input
        type="text"
        value={inputToken}
        onChange={handleTokenChange}
        className="input-field"
      />
      <button onClick={handleSetToken} className="login-button">
        Set Token
      </button>
    </div>
  );
};

export default Login;
