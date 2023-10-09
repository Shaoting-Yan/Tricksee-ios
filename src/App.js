import logo from './logo.svg';
import './App.css';
import ReactGA from 'react-ga';


function App() {
  const TRACKING_ID = "G-K853SF4HV7"; // OUR_TRACKING_ID
  ReactGA.initialize(TRACKING_ID);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
