import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!username || !password) {
      alert("All fields are required!");
      return;
    }

    const data = {
      username: username,
      password: password,
    };

    // Fetch for logging in
    fetch("https://testmovieapi.onrender.com/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('AlGoriThm!', data.token);
        onLoggedIn(username);
      } else {
        alert("Login failed");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred while logging in.");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
