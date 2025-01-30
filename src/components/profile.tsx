import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import './profile.css';
import { User } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      setUser(null);
    }).catch((error) => {
      // An error happened.
      console.error("Error signing out:", error);
    });
  };

  if (!user) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={user.photoURL || '/default-profile.png'} alt="Profile" className="profile-image" />
        <h2>{user.displayName || 'Anonymous User'}</h2>
        <p>Email: {user.email}</p>
        <p>UID: {user.uid}</p>
        <p>Account Created: {user.metadata.creationTime}</p>
        <p>Last Sign-In: {user.metadata.lastSignInTime}</p>
        <button onClick={handleSignOut} className="sign-out-button">Sign Out</button>
      </div>
    </div>
  );
};

export default Profile;