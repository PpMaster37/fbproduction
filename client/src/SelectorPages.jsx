import { AnimatePresence, motion, scale } from "motion/react";
import './App.css'

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

export function SelectorPages(props){
    return(<AnimatePresence mode="wait">
    {(() => {switch (props.status) {
        case 'title': 
          return (
            <motion.div key={'titleDiv'} exit={{ opacity: 0, x: -50 }}>
              <motion.ul key={'O'} variants={scoopsContainer} initial='hidden' animate='visible'
                exit={{ opacity: 0, x: -50 }}>
                <motion.li key={'mini'} variants={scoopsItem}
                    whileHover={{scale : 1.5}}
                    exit={{ opacity: 0, x: -50 }}
                    onClick={() => {
                        props.setScoops(1);
                        props.setStatus('addFlavors');
                    }}>Mini</motion.li>
                <motion.li key={'small'} variants={scoopsItem}
                    whileHover={{scale : 1.5}}
                    exit={{ opacity: 0, x: -50 }}
                    onClick={() => {
                        props.setScoops(2);
                        props.setStatus('addFlavors');
                    }}>Small</motion.li>
                <motion.li key={'large'} variants={scoopsItem}
                    whileHover={{scale : 1.5}}
                    exit={{ opacity: 0, x: -50 }}
                    onClick={() => {
                        props.setScoops(4);
                        props.setStatus('addFlavors');
                    }}>Large</motion.li>
              </motion.ul>
            </motion.div>
         );
        case 'addFlavors':
          return (
            <motion.div key={'flavorDiv'}>
              <motion.button key={'backbutton'} 
                onClick={() => props.setStatus('title')}>Go Back!</motion.button>
              <motion.div className='flavorContainer' variants={flavorContainer}
                initial='hidden' animate='visible' key={'flavorGrid'}>
                {props.availableFlavors.map((flavor) => {
                    return  <motion.button variants={flavorItem} key={flavor} onClick={
                        () => {
                            props.setFlavors([...props.selectedFlavors, flavor]);
                            console.log(props.selectedFlavors);
                        }
                    }>
                                {flavor}
                            </motion.button>
                })}
              </motion.div>
              <motion.button onClick={() => {
                props.setStatus('addToppings');
              }}>Go Add Toppings!</motion.button>
              <motion.button>Submit Without Toppings</motion.button>
            </motion.div>
          );
        case 'addToppings':
            return (
                <motion.div key={'toppingDiv'}></motion.div>
            );
        default:
          return(<motion.div key={'defaultDiv'}>DEFAULT</motion.div>);
        }
      }
    )()}
    </AnimatePresence>
    )
}