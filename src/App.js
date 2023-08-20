import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import ChatGPT from './pages/ChatGPT/ChatGPT';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chatgpt" element={<ChatGPT />} />
      </Routes>
    </Router>
  );
}

export default App;
