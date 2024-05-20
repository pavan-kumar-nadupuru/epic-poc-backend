import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import MainContent from './components/MainContent';
import AuthComponent from './components/AuthComponent';



function App() {
  return (
    <Router>
      <Routes >
        <Route path="/" Component={MainContent} />
        <Route path="/callback" Component={AuthComponent} />

      </Routes >

      {/* <div className="app-container d-flex justify-content-center align-items-center"> */}
      {/* <InitiateAuth /> */}
      {/* <SearchPatient /> */}
      {/* </div> */}
    </Router>
  );
}

export default App;