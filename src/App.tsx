import React, { useEffect } from 'react';
import Axios from 'axios'
import {useState } from 'react';
import './App.scss';

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
