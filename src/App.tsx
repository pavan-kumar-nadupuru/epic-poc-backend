import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import MainContent from './components/MainContent';



function App() {
  return (
    <Router>
      <Routes >
        <Route path="/" Component={MainContent} />

      </Routes >

      {/* <div className="app-container d-flex justify-content-center align-items-center"> */}
      {/* <InitiateAuth /> */}
      {/* <SearchPatient /> */}
      {/* </div> */}
    </Router>
  );
}

export default App;