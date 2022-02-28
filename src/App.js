import './App.css';
import Header from './Header.js'
import Library from './Library'
import Login from './Login'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './Home'

function App() {
  return (
    <Router>
      <div className="app">
        <Header/>
        <Routes>
          <Route path="/" element={
            <Home/>
          }/>
          <Route path='/login' element={
            <Login/>
          }
            />
          <Route path='/library' element={
            <Library/>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
