import { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Body/Card/Card';
import Header from './Components/Header/Header';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return ( 
    <div className="App">
       <Header />
       <div className="panel-content">
        {data &&
          data["tickets"]?.map((d, i) => {
            return (
              <Card ticket={d} key={i}/>
            );
          })}
      </div>

    </div>     
  );
}

export default App;
