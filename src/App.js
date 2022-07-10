import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header.js";
import Library from "./Library";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import firebase from "./firebase";
import Home from "./Home";
import SearchBook from "./SearchBook";

var db = null;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user !== null) {
        db = firebase.firestore();
        db.collection("users").doc(user.uid).set(
          {
            name: user.displayName,
            email: user.email,
          },
          { merge: true }
        );
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login user={user} />} />
          <Route path="/library" element={<Library user={user} />} />
          <Route path="add" element={<SearchBook user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export { db };
export default App;
