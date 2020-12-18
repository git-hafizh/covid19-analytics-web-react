import React from 'react';
import './App.css';
import Homepage from './Pages/Homepage';
import Navbars from './Pages/Navbars';
import Kasus from './Pages/Kasus';
import News from './Pages/News';
import DataCharts from './Pages/DataCharts';
import { Provider } from 'react-redux';
import { store } from './redux';

function App() {
  return (
    <div style={{background: "#F7FAFC"}}>
      <Provider store={store}>
        <Navbars/>
        <Homepage/>
        <DataCharts/>
        <News/>
        <Kasus/>
      </Provider>
    </div>
  );
}

export default App;
