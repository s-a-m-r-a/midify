import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faSave,
  faEdit,
  faCircleExclamation,
  faCircleCheck,
  faInfoCircle,
  faPencil,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import ChangePassword from "../../components/ChangePassword/ChangePassword";
import "./Profile.css";

export default function Profile() {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [initUsername, setInitUsername] = useState("");
  const [edit, setEdit] = useState(false);

  const minLen = 5;
  const maxLen = 10;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const fetchedUsername = docSnap.data().username || "";
        setUsername(fetchedUsername);
        setInitUsername(fetchedUsername);
      }
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async () => {
    try {
      await setDoc(doc(db, "users", user.uid), { username }, { merge: true });
      setInitUsername(username);
      setEdit(false);
      alert("Username successfully updated!");
    } catch (err) {
      console.error("Update failed.", err);
    }
  };

  const handleCancel = () => {
    setUsername(initUsername);
    setEdit(false);
  };

  const getWarnText = () => {
    const len = username.trim().length;
    if (len < minLen / 2)
      return {
        icon: faCircleExclamation,
        text: "Username is too short!",
        color: "red",
      };
    if (len < minLen)
      return {
        icon: faPencil,
        text: `Consider entering minimum ${minLen} characters.`,
        color: "orange",
      };
    if (username === initUsername)
      return {
        icon: faInfoCircle,
        text: "Username must be different from the previous one.",
        color: "blue",
      };
    return {
      icon: faCircleCheck,
      text: "All good!",
      color: "green",
    };
  };

  const isSaveDisabled = () => {
    const len = username.trim().length;
    return len < minLen || len > maxLen || username === initUsername;
  };

  const getProgressWidth = () => {
    const len = username.trim().length;
    const percent = Math.min((len / maxLen) * 100, 100);
    return `${percent}%`;
  };

  const getProgressColor = () => {
    const len = username.trim().length;
    if (len < minLen / 2 || len > maxLen) return "red";
    if (len < minLen) return "orange";
    if (username === initUsername) return "blue";
    return "green";
  };

  if (!user) return <div className="user-profile">Please log in.</div>;

  const warning = getWarnText();

  return (
    <>
    <div className="profile-page">
    <div className="user-profile">
      <h2>
        <FontAwesomeIcon
          icon={faCircleUser}
          style={{ color: "#8486ee", marginRight: "8px" }}
        />
       {username}'s Profile
      </h2>
      <p>
        <b>E-mail:</b> {user.email}
      </p>
      {edit ? (
        <>
          <div className="input-wrapper">
            <input
              type="text"
              name="username"
              autoComplete="username"
              value={username}
              minLength={minLen}
              maxLength={maxLen}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
        <div className="btn-group">
            <button
              className="save-btn"
              onClick={handleUpdate}
              disabled={isSaveDisabled()}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Save
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              <FontAwesomeIcon icon={faXmark} style={{ marginRight: "5px" }} />
              Cancel
            </button>
          </div>
        </div>
          <div className="progress-bar-wrapper">
            <div
              className="progress-bar-fill"
              style={{
                width: getProgressWidth(),
                backgroundColor: getProgressColor(),
              }}
            ></div>
          </div>

          <div className="warn-text">
            <FontAwesomeIcon
              icon={warning.icon}
              style={{ marginRight: "6px", color: warning.color }}
            />
            {warning.text}
          </div>
        </>
      ) : (
        <>
          <p>
            <b>Username:</b> {username}
          </p>
          <button onClick={() => setEdit(true)}>
            <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
            Edit
          </button>
        </>
      )}
      <ChangePassword />
    </div>
    </div>
    </>
  );
  
}