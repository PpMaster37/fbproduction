import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import {AnimatePresence, motion} from 'motion/react';
import { SelectorPages } from './SelectorPages';

async function clearDatabase(){
  try{
    await axios.get('http://localhost:8080/mongoClear').then(
      (response) => {console.log(response.data)}
    )
  } catch(error) {
    console.error(error)
  }
}

function App() {
  const [status, setStatus] = useState('chooseSize');
  const [loading, setLoading] = useState(true);
  const [selectedFlavors, setFlavors] = useState([]);
  const [selectedToppings, setToppings] = useState([]);
  const [scoops, setScoops] = useState('none');
  const [availableFlavors, setAvailableFlavors] = useState([]);

  const updateStatus = (newStatus) => {setStatus(newStatus)};
  const updateFlavors = (newFlavors) => {setFlavors(newFlavors)};
  const updateToppings = (newToppings) => {setToppings(newToppings)};
  const updateScoops = (newScoops) => {setScoops(newScoops)};

  const submitOrder = async () => {
    //Send state variables to the database
    let tempToppings = selectedToppings;
    if(selectedFlavors.length == 0){
      setFlavors(['No flavors?']);
    } 
    if(selectedToppings.length == 0){
      setToppings(['No toppings']);
      tempToppings = ['No toppings'];
    }
    try{
      await axios.post('http://localhost:8080/orderUpdate', {
        scoops: scoops,
        flavors: selectedFlavors,
        toppings: tempToppings
      }).then((response) => {
        console.log(response.data.message);
      })
    } catch (error){
      console.error(error);
    }
  }

  useEffect( () => {
    console.log('useEffect called');
    const axiosWrapper = async () => {
      try {
        const response = await axios.get('http://localhost:8080/flavors');
        setLoading(false);
        const newArray = response.data;
        console.log(response);
        setAvailableFlavors(newArray);
      } catch (error) {
        console.error(error);
      }
    }
    axiosWrapper();
  }, []);

  if(loading){
    return (
      <div>
        <p>We loading rn</p>
      </div>
    )
  } else {
    console.log('LOADING FINISHED')
    return (
      <div className="App">
        <header className="App-header" id='center'>
          <motion.h1>HERO TEXT</motion.h1>
            <SelectorPages 
              status={status} 
              scoops={scoops}
              setStatus={updateStatus}
              selectedFlavors={selectedFlavors}
              setFlavors={updateFlavors}
              selectedToppings={selectedToppings}
              setToppings={updateToppings}
              setScoops={updateScoops}
              availableFlavors={availableFlavors}
              submitOrder={submitOrder}></SelectorPages>
        </header>
      </div>
    )
  }
}

export default App
