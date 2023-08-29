import { useState } from "react";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if(password.length <6){
      alert("Password must be at least 6 characters long.");
      return;
    }

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch("https://testmovieapi.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.error("Signup failed:", errorData);
            throw new Error("Signup failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        alert("Signup successful");
        window.location.reload();
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>  
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};