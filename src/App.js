import './App.css';
import Header from './Header.js'
import Snowfall from 'react-snowfall'

function App() {
  return (
    <div className="app">
      <Header user="Guest"/>
      <Snowfall color='white'/>
    </div>
  );
}

export default App;
