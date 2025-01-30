import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import './login.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDknoxIQcfBgQbFPE3JZEVh7o6wQyV77CU",
  authDomain: "xvatai.firebaseapp.com",
  projectId: "xvatai",
  storageBucket: "xvatai.firebasestorage.app",
  messagingSenderId: "571687658296",
  appId: "1:571687658296:web:955d4ac969606f08f657cd",
  measurementId: "G-E5FQMPBHG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      // Check if the user exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        localStorage.setItem('username', username);
        navigate("/dashboard");
      } else {
        alert("Access denied. User not found in the database.");
        await auth.signOut();
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Invalid credentials. Try again!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      localStorage.setItem('username', user.displayName || user.email || 'unknown');
      localStorage.setItem('profilePic', user.photoURL || ''); // Store profile pic
  
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("Failed to login with Google. Try again!");
    }
  };  

  return (
    <div className="login-page">
      <header className="nav-header">
        <div className="logo">
          <img src='/logo.png' alt="XVAT.AI Logo" />
        </div>
        <nav>
          <a href="#home">home</a>
          <a href="#release">release notes</a>
          <a href="#about">about us</a>
          <button className="download-btn">DOWNLOAD</button>
        </nav>
      </header>
      
      <div className="login-container">
        <div className="login-card">
          <h2>LOGIN</h2>
          <p className="signup-text">
            Don't have an account? <a href="#signup">Sign up</a>
          </p>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe123"
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="johndoe123"
              />
              <div className="forgot-password">
                <a href="#reset">Reset Password</a>
              </div>
            </div>
            
            <div className="remember-me">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                Remember Me
              </label>
            </div>
            
            <button type="submit" className="login-button">
              Login <span className="arrow">→</span>
            </button>
          </form>
          
          <button onClick={handleGoogleLogin} className="google-login-button">
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
