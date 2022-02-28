import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header.js'
import Library from './Library'
import Login from './Login'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import firebase from './firebase';
import Home from './Home'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  
  return (
    <Router>
      <div className="app">
        <Header/>
        <Routes>
          <Route path="/" element={
            <Home user={user}/>
          }/>
          <Route path='/login' element={
            <Login />
          }
            />
          <Route path='/library' element={
            <Library user={user}/>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
