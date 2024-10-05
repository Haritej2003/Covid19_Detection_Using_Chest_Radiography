import React from 'react';
import './App.css';
import ImageUpload from './ImageUpload';
import Header from './Header.jsx';
import About from './About.jsx';
import Symptoms from './Symptoms.jsx';
import Predict from './Predict.jsx';

function App() {
  return <>
    <Header/>
    {/* <About/> */}
    {/* <Symptoms/> */}
    <ImageUpload/>
  </>
}

export default App;
