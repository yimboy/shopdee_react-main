import './App.css';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import React from 'react';
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/profile/:id' element={<Profile/>} />
        <Route exact path='/homepage' element={<HomePage/>} />
        <Route exact path='/signin' element={<SignIn/>} />
        <Route exact path='/signup' element={<SignUp/>} />
      </Routes>
    </Router>
    
  );
}

export default App;