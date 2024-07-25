import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import TodoList from './components/TodoList';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import Homepage from './components/Homepage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/todos" element={<Homepage />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
