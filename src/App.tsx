import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import MainContent from './components/MainContent';
import AuthComponent from './components/AuthComponent';
import CernerAuthComponent from './components/CernerAuthComponent';



function App() {
  return (
    <Router>
      <Routes >
        <Route path="/" Component={MainContent} />
        <Route path="/callback" Component={AuthComponent} />
        <Route path="/cerner/callback" Component={CernerAuthComponent} />
      </Routes >
    </Router>
  );
}

export default App;