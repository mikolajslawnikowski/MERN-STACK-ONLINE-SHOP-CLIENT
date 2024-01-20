import { useState } from "react";

const UserForm = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/user/changeEmail/${user._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: user._id, newEmail: email }),
    });
    const data = await response.json();
    console.log(data);
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/user/changePassword${user._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: user._id, newPassword: password }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h2>Change your data:</h2>
      <form onSubmit={handleEmailChange}>
        <label>Current email:</label>
        <input type="text" />
        <label>New email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={handlePasswordChange}>
        <label>Current password:</label>
        <input type="password" />
        <label>New password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
