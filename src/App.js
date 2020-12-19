import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux';
import { DataCountry, Homepage, Navbars, News, WorldCase } from './Pages';

function App() {
  return (
    <div style={{background: "#F7FAFC"}}>
      <Provider store={store}>
        <Navbars/>
        <Homepage/>
        <DataCountry/>
        <News/>
        <WorldCase/>
      </Provider>
    </div>
  );
}

export default App;
