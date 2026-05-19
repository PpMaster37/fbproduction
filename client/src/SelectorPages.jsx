import { AnimatePresence, motion, scale } from "motion/react";
import './App.css';
import {useState} from 'react';

const toppingArray = [
  'Chocolate Syrup',
  'Caramel Syrup',
  'Whipped Cream',
  'Orea Pieces',
  'Mochi Bits',
  'Gummy Stuff',
  'Cookie Dough Bites',
  'M&Ms'
];

const scoopsContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};
  
const scoopsItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const flavorContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
};
  
const flavorItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const toppingContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const toppingItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function SelectorPages(props){
  const [warning, setWarning] = useState(false);
  const [visualFlavors, setVisuals] = useState([false, false, false, false]);
  const [visualHead, setVisualHead] = useState(0);

    return(<AnimatePresence mode="wait">
    {(() => {switch (props.status) {
        case 'chooseSize': 
          return (
            <motion.div key={'sizeDiv'} exit={{ opacity: 0, x: -50 }}>
              <motion.ul key={'O'} variants={scoopsContainer} initial='hidden' animate='visible'
                exit={{ opacity: 0, x: -50 }}>
                <motion.li key={'mini'} variants={scoopsItem}
                    whileHover={{scale : 1.5}}
                    exit={{ opacity: 0, x: -50 }}
                    onClick={() => {
                        props.setScoops('Mini');
                        props.setStatus('addFlavors');
                    }}>Mini</motion.li>
                <motion.li key={'small'} variants={scoopsItem}
                    whileHover={{scale : 1.5}}
                    exit={{ opacity: 0, x: -50 }}
                    onClick={() => {
                        props.setScoops('Small');
                        props.setStatus('addFlavors');
                    }}>Small</motion.li>
                <motion.li key={'large'} variants={scoopsItem}
                    whileHover={{scale : 1.5}}
                    exit={{ opacity: 0, x: -50 }}
                    onClick={() => {
                        props.setScoops('Large');
                        props.setStatus('addFlavors');
                    }}>Large</motion.li>
              </motion.ul>
            </motion.div>
         );
        case 'addFlavors':
          return (
            <motion.div key={'flavorDiv'}>
              <motion.button key={'backbutton'} 
                onClick={() => props.setStatus('chooseSize')}>Go Back!</motion.button>
              <motion.div className="allFlavorsDiv">
                {props.selectedFlavors.map((flavor, index) => {
                  return(visualFlavors[index] && (<motion.div key={flavor + index}
                    initial={{opacity : 0, y : -20}}
                    animate={{opacity : 1, y : 0}}
                    exit={{opacity : 0, x : -50}}
                    transition={{duration : 0.5}}
                    whileHover="hover"
                    className="visualScoopContainer"
                    onClick={() => {
                      let newHead = visualHead - 1;
                      setVisualHead(newHead);
                      let count = 0;
                      const newVisualArray = visualFlavors.map(() => {
                        if(count < newHead){
                          count++;
                          console.log(count);
                          return true;
                        } else {
                          count++;
                          return false;
                        }
                      })
                    console.log(flavor + ' was removed!');
                    setVisuals(newVisualArray);
                    const newFlavorArray = props.selectedFlavors.filter(selectFlavor =>{
                      return selectFlavor !== flavor;
                    })
                    props.setFlavors(newFlavorArray);
                  }}>
                    <div className='visualLabel'>{flavor}</div>
                    <motion.div
                      variants={{
                      hover: { opacity: 1, scale: 1 }, 
                    }}
                      initial={{ opacity: 0, scale: 0.5 }} 
                      transition={{ duration: 0.3 }}
                      className='scoopX'>
                        ✕</motion.div>
                   </motion.div>))
                })}
                {/* <motion.svg></motion.svg> */}
              </motion.div>
              <motion.div className='flavorContainer' variants={flavorContainer}
                initial='hidden' animate='visible' key={'flavorGrid'}>
                {props.availableFlavors.map((flavor) => {
                    return  <motion.button variants={flavorItem} key={flavor} onClick={
                        () => {
                            props.setFlavors([...props.selectedFlavors, flavor]);
                            let newHead = visualHead + 1;
                            setVisualHead(newHead);
                            let count = 0;
                            const newVisualArray = visualFlavors.map(() => {
                              if(count < newHead){
                                count++;
                                return true;
                              } else {
                                count++;
                                return false;
                              }
                            })
                            setVisuals(newVisualArray);
                            console.log(flavor + ' was added!');
                        }
                    }> {flavor} </motion.button>
                })}
              </motion.div>
              <motion.button onClick={() => {
                if(props.selectedFlavors.length != 1 && props.scoops === 'Mini'){
                  setWarning(true);
                } else if(props.selectedFlavors.length != 2 && props.scoops === 'Small'){
                  setWarning(true);
                } else if(props.selectedFlavors.length != 4 && props.scopps === 'Large'){
                  setWarning(true);
                } else {
                  props.setStatus('addToppings');
                }
              }}>Go Add Toppings!</motion.button>
              <motion.button onClick={() => {
                if(props.selectedFlavors.length < 1 && props.scoops === 'Mini'){
                  setWarning(true);
                } else if(props.selectedFlavors.length < 2 && props.scoops === 'Small'){
                  setWarning(true);
                } else if(props.selectedFlavors.length < 4 && props.scopps === 'Large'){
                  setWarning(true);
                } else {
                  props.submitOrder();
                  props.setStatus('end');
                }}}>Submit Without Toppings</motion.button>
              {warning && <motion.div className={'scoopWarning'}
                initial={{opacity : 0}}
                animate={{opacity : 1}}
              >You have the wrong number of scoops!</motion.div>}
            </motion.div>
          );
        case 'addToppings':
            return (
                <motion.div key={'toppingDiv'}>
                  <motion.div className='toppingContainer' variants={toppingContainer}
                    initial='hidden' animate='visible' key={'toppingGrid'}>
                    {toppingArray.map((topping) => {
                      return  <motion.button variants={toppingItem} key={topping} onClick={
                          () => {
                            props.setToppings([...props.selectedToppings, topping]);
                            console.log(topping + " added!");
                          }
                      }> {topping} </motion.button>
                    })}
                  </motion.div>
                  <motion.button onClick={() => {
                    props.submitOrder();
                    props.setStatus('end');
                  }}>Submit Order!</motion.button>
                  <motion.button onClick={() => props.setStatus('addFlavors')}>
                    Go Back!
                  </motion.button>
                </motion.div>
            );
        case 'end':
          return (
            <motion.div>Your order has been submitted!</motion.div>
          );
        default:
          return(<motion.div key={'defaultDiv'}>DEFAULT</motion.div>);
        }
      }
    )()}
    </AnimatePresence>
    )
}