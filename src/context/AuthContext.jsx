import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential, 
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setUserData(null);
      return;
    }

    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    });

    return () => unsubscribe();
  }, [user]);

  const doCreateUserWithEmailAndPassword = async (email, password, username) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", res.user.uid), {
      email,
      username,
    });
    await sendEmailVerification(res.user);
    return res;
  };

  const doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await setDoc(
      doc(db, "users", result.user.uid),
      {
        username: result.user.displayName || "",
        email: result.user.email,
      },
      { merge: true }
    );
    return result.user;
  };

  const doSignOut = () => signOut(auth);

  const doPasswordReset = (email) => sendPasswordResetEmail(auth, email);
  
  const doPasswordChange = async (currentPassword, newPassword) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is signed in");

  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPassword);
};

  const doSendEmailVerification = () =>
    sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/home`,
    });

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        doCreateUserWithEmailAndPassword,
        doSignInWithEmailAndPassword,
        doSignInWithGoogle,
        doSignOut,
        doPasswordReset,
        doPasswordChange,
        doSendEmailVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);