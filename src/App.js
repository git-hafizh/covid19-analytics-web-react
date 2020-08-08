import React from 'react';
import './App.css';
import Homepage from './Pages/Homepage';
import Navbars from './Pages/Navbars';
import Kasus from './Pages/Kasus';
import News from './Pages/News';
import DataCharts from './Pages/DataCharts';

function App() {
  return (
    <div style={{background: "#F7FAFC"}}>
      <Navbars/>
      <Homepage/>
      <Kasus/>
      <News/>
      <DataCharts/>
    </div>
  );
}

export default App;
