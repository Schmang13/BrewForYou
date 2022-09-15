import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './containers/Home';
import Personal from './containers/Personal';
import Header from './containers/Header';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personal" element={<Personal />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App