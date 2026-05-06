import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import {AnimatePresence, motion} from 'motion/react';
import { SelectorPages } from './SelectorPages';

function TestComponent({data}) {
  return (
    <div>
      <p>{data}</p>
    </div>
  )
}

async function accessDatabase(){
  try{
    await axios.get('http://localhost:8080/mongoQuery').then(
      (response) => {console.log(response.data)} 
    );
  } catch(error) {
    console.error(error);
  }
}

async function updateDatabase(){
  try{
    await axios.post('http://localhost:8080/mongoUpdate',
      {data: 'hello'}
    ).then((response) => {console.log(response.data.message)});
  } catch(error) {
    console.error(error);
  }
}

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
  const [status, setStatus] = useState('title');
  const [loading, setLoading] = useState(true);
  const [selectedFlavors, setFlavors] = useState(['']);
  const [selectedToppings, setToppings] = useState(['']);
  const [scoops, setScoops] = useState(0);
  const [availableFlavors, setAvailableFlavors] = useState([]);

  const updateStatus = (newStatus) => {setStatus(newStatus)};
  const updateFlavors = (newFlavors) => {setFlavors(newFlavors)};
  const updateToppings = (newToppings) => {setToppings(newToppings)};
  const updateScoops = (newScoops) => {setScoops(newScoops)};
  const submitOrder = async () => {
    //Send state variables to the database
  }

  async function sendData(){
    let inputValue = document.getElementById('testInput').value;
    if(inputValue == null){
      inputValue = 'Placeholder for empty';
    }
    try{
      await axios.post('http://localhost:8080/mongoUpdate', 
        {data: inputValue}
      ).then(
        (response) => {
          console.log(response.data.message);
        }
      )
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log('useEffect called');
    const wrapperMethod = async() => {
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
    wrapperMethod();
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
              setStatus={updateStatus}
              selectedFlavors={selectedFlavors}
              setFlavors={updateFlavors}
              slectedToppings={selectedToppings}
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
