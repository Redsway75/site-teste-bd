import React from 'react';
import './css/App.css';
import './css/reset.css';
import './css/animations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormLabel from './components/forms'; // Importe o componente FormLabel

function App() {
  return (
    <div className='App'>
      <div className='background-container'>
        <div className='cont-1'>SEJA BEM VINDO!</div>
        <div className='cont-0'>
          <div className='logo'></div>
          <FormLabel/>
        </div>
      </div>
    </div>
  );
}

export default App;
