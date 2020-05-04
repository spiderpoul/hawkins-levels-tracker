import React from 'react';
import Axios from 'axios'
import {useState } from 'react';
import './App.css';
import { useEffect } from 'react/cjs/react.production.min';

function App() {
  const [level, setLevel] = useState(null); 

  useEffect(() => {
    Axios.get('/api/db').then(res => console.log(res))
  });
  return (
    <main>
      <input value={level} onChange={e => setLevel(e.target.value)} />
      <button onClick={async () => {
        const res = await Axios.post('/api/setData', {level})
        console.log(res);
      }}>Send</button>
    </main>
  );
}

export default App;
