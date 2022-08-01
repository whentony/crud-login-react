import './App.css';
import Login from './components/Login/Login';
import { AuthProvider } from './contexts/Auth';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Table from './components/Table/Table';
import Register from './components/Register/Register';

function App() {

  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/table" element={<Table />} />
          <Route path="/register/:id" element={<Register />} />
          <Route path="/register/" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;