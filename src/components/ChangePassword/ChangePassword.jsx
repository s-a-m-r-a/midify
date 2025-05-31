import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./ChangePassword.css";

export default function ChangePassword() {
  const { doPasswordChange } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("")

  const handleChangePassword = async () => {
  setMessage("");
  setErrMsg("");
  try {
    await doPasswordChange(currentPassword, newPassword);
    setMessage("Password successfully updated!");
    setCurrentPassword("");
    setNewPassword("");
  } catch (err) {
  console.log("Error:", err);
  if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
    setErrMsg("Current password is wrong.");
  } else if (err.code === "auth/weak-password") {
    setErrMsg("New password is too weak.");
  } else {
    setErrMsg("Error: " + (err.message || err));
  }
}
};

  return (
    <div className="change-password">
      <h3>Change Password</h3>
      <input
        type="password"
        name="current-password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        name="new-password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleChangePassword}>Update Password</button>
      {message && <p style={{color: "green"}}>✔ {message}</p>}
      {errMsg && <p style={{color: "red"}}>❌ {errMsg}</p>}
    </div>
  );
}
