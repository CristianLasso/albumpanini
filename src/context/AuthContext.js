import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase/firebase';
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    })
  }, [])

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const loginGoogle = () => {
    const provider = new GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  }

  const loginFacebook = () => {
    const provider = new FacebookAuthProvider();
    return auth.signInWithPopup(provider);
  }

  const logout = () => auth.signOut();

  const value = {
    currentUser,
    login,
    loginGoogle,
    loginFacebook,
    logout,
    signup
  };
  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}