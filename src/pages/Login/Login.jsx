import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import "./Login.css";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");

  const navigate = useNavigate();
  const {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    doSignInWithGoogle,
    doPasswordReset,
    user,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setInfoMsg("");
    setLoading(true);

    try {
      if (isSignup) {
        const res = await doCreateUserWithEmailAndPassword(email, password);
        await setDoc(doc(db, "users", res.user.uid), {
          username: username,
          email: res.user.email,
        });
        toast.success("Account created successfully! Please verify your email.");
        setInfoMsg("A verification email has been sent. Please check your inbox.");
      } else {
        const res = await doSignInWithEmailAndPassword(email, password);
        if (!res.user.emailVerified) {
          setErr("Your email is not verified. Please verify your email first.");
          setLoading(false);
          return;
        }
        toast.success("Logged in successfully!");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErr("");
    setLoading(true);
    setInfoMsg("");

    try {
      const userGoogle = await doSignInWithGoogle();
      await setDoc(doc(db, "users", userGoogle.uid), {
        username: userGoogle.displayName || "",
        email: userGoogle.email,
      }, { merge: true });
      toast.success("Logged in with Google!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
    setErr("");
    setInfoMsg("");
  };

  const handleResetPassword = async () => {
    if (!email) {
      setErr("Please enter your email to reset password.");
      return;
    }
    setErr("");
    setInfoMsg("");
    setLoading(true);
    try {
      await doPasswordReset(email);
      setInfoMsg("Password reset email sent! Please check your inbox.");
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login">
        <ToastContainer />
        <h2>{isSignup ? "Create Account" : "Login"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            name="e-mail"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
        <div className="password-wrapper">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            minLength={6}
            autoComplete={isSignup ? "new-password" : "current-password"}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {!isSignup && (
            <span
              className="forgot-link"
              onClick={handleResetPassword}
              role="button"
              tabIndex={0}
            >
              Forgot password?
            </span>
          )}
        </div>
          <button type="submit" disabled={loading}>
            {loading ? <div className="spinner"></div> : isSignup ? "Signup" : "Login"}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-btn" onClick={handleGoogleLogin} disabled={loading}>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <>
              <FcGoogle size={20} style={{ marginRight: "8px", verticalAlign: "middle" }} />
              Continue with Google
            </>
          )}
        </button>

        {err && <p className="error">{err}</p>}
        {infoMsg && <p className="info-msg">{infoMsg}</p>}

        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "New to Midify?"}
          <span
            onClick={toggleForm}
            role="button"
            tabIndex={0}
          >
            {isSignup ? "Login" : "Signup"}
          </span>
        </p>
      </div>
    </div>
  );
}