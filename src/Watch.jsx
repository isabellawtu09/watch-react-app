
import React, {useState, useEffect, useRef} from 'react';


// provider components - holds the value we want to pass
// down onto  the reciever components that are nested
//within the provider component

// 1 . import {createContext} from react
//2. export const MyContext = createContext();
// 3. <MyContext.Provider value = {value}>
//      <Child/>
//    </MyContext.Provider>

// consumer/ reciever components
// we must import the context such as MyContext onto
// the child components file like we would in App.jsx
// 1. import React , {useContext} from 'react'
// 2.  import {MyContext} from './ComponentA'
//3. const value = useContexxt(MyContext);

function Watch(){

    // stopwatch is not initally running
    const [isRunning, setisRunning] = useState(false);

    const[elapsedTime, setelapsedTime] = useState(0);

    // reference to the the current interval of time
    // we can clear the interval if it is not in use
    const intervalIdRef = useRef(null);

    // the current time to start the stopwatch from
    const startTimeRef = useRef(0);


    // arrow function , uses the dependency of isRunning
    // when the component is mounted and if isRunning changes
    // we perform the arrow function
    useEffect(() => {
            /// Move time forward
        if(isRunning){
           intervalIdRef.current =  setInterval(() => {
                setelapsedTime(Date.now() - startTimeRef.current);
            }, 10);

            // cleanup function when component unmounts or isRunning changes to false
            return() => {

                clearInterval(intervalIdRef.current);

            }
        }


    } , [isRunning])


    function start(){

        // set state to true
        setisRunning(true);
        startTimeRef.current =  Date.now() - elapsedTime;


    }


    function stop(){

        setisRunning(false);


    }

    function reset(){

        setelapsedTime(0);
        setisRunning(false);


    }



    function formatTime(){
        // converting milliseconds into hours minutes and seconds
        let hours = Math.floor(elapsedTime / ( 1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60 ) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        // only displaying minutes seconds & milliseconds
        return `${minutes} : ${seconds} : ${milliseconds}`;

    }


return(


    <div className = "stopwatch">
        <h1>Stopwatch</h1>
        <div className = "display">
            {formatTime()}
        </div>
        <div className = "controls">
            <button onClick = {start} className = "start-button">Start</button>
            <button onClick = {stop} className = "stop-button">Stop</button>
            <button onClick = {reset} className = "reset-button">Reset</button>
        </div>
    </div>


);




}

export default Watch