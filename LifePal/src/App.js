import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './pages/home';
import EditContact from './pages/EditContact'
import AddContact from './pages/AddContact';
import View from './pages/View';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className = "App">
        <Header />
        <ToastContainer position="top-center"/>
          <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/add" element = {<AddContact/>}/>
          <Route path = "/edit/:id" element = {<EditContact/>}/>
          <Route path = "/view/:id" element = {<View/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
 


