import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // Declara una nueva variable de estado, la cual llamaremos “count”
  const [data, setData] = useState({"data":"d"});

  useEffect(()=>{
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        setData(persons)
        console.log(persons)
      })
  },[])

  return (
    <div className="container">
      <div className="row">
        {Object.keys(data).map((key)=>{
          return(<div key={key}>
            <h6>{key}</h6>
            <p>{data[key].name}</p>
          </div>)
        })}
      </div>
    </div>
  );
}

export default App;
