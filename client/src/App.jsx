import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import {motion} from 'motion/react';

function TestComponent({data}) {
  return (
    <div>
      <p>{data}</p>
    </div>
  )
}

async function accessDatabase(){
  try{
    await axios.get('http://localhost:9000/mongoQuery').then(
      (response) => {console.log(response.data)} 
    );
  } catch(error) {
    console.error(error);
  }
}

async function updateDatabase(){
  try{
    await axios.post('http://localhost:9000/mongoUpdate',
      {data: 'hello'}
    ).then((response) => {console.log(response.data.message)});
  } catch(error) {
    console.error(error);
  }
}

async function clearDatabase(){
  try{
    await axios.get('http://localhost:9000/mongoClear').then(
      (response) => {console.log(response.data)}
    )
  } catch(error) {
    console.error(error)
  }
}

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedFlavors, setFlavors] = useState(['']);
  const [scoops, setScoops] = useState(0);
  const [availableFlavors, setAvailableFlavors] = useState([]);
  const [dynamicTest, setDynamic] = useState([]);

  async function refreshDynamic(){
    try{
      await axios.get('http://localhost:9000/mongoQuery').then(
        (response) => {
          setDynamic(response.data);
        }
      )
    } catch(error) {
      console.error(error);
    }
  }

  async function sendData(){
    let inputValue = document.getElementById('testInput').value;
    if(inputValue == null){
      inputValue = 'Placeholder for empty';
    }
    try{
      await axios.post('http://localhost:9000/mongoUpdate', 
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
        <header className="App-header">
          <motion.button 
          whileHover={{scale: 2.0}}
          onClick={() => {accessDatabase()}}>Testing Getfrom DB</motion.button>
          <button onClick={() => {updateDatabase()}}>Testing updating DB</button>
          <button onClick={() => {clearDatabase()}}>Clear DB</button>
          <button onClick={() => {refreshDynamic()}}>Refresh</button>
          <label htmlFor='testInput'>Place text in here!</label>
          <input type='text' id='testInput'></input>
          <button onClick={() => {sendData()}}>Submit</button>
          {dynamicTest.map((item, index) => {
            console.log(item.scoops);
            return <TestComponent data={item.scoops} key={index}></TestComponent>
          })}
        </header>
      </div>
    )
  }
}

export default App
