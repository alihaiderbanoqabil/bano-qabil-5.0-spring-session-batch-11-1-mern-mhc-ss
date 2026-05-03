import React, { memo, useCallback, useContext, useState } from 'react'
import { UserContext } from '../context/inde';

export const UseCallback = () => {
    const [name, setName] = useState("")
    const state = useContext(UserContext);
    console.log(state, "state", name);

    return (
        <div>
            <h1>{state.user}</h1>
            <input type="text" value={name} placeholder='Enter your name to change' onChange={e => setName(e.target.value)} />
            <button onClick={() => state.setUser(name)} >Update Name</button>
            <WithoutCallbackExample />
        </div>
    )
}


//Without useCallback:

// Child component that receives a function prop
const Button = memo(({ onClick, text }) => {
    // alert(`Child ${text} button rendered`);
    console.log(`Child ${text} rendered`);

    return <button onClick={onClick}>{text}</button>;
});

// Parent component without useCallback
function WithoutCallbackExample() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    // This function is recreated on every render
    // const handleClick1 = () => {
    //     setCount1(count1 + 1);
    // };

    // const handleClick2 = () => {
    //     setCount2(count2 + 1);
    // };

    // These functions are memoized and only recreated when dependencies change
    const handleClick1 = useCallback(() => {
        setCount1(count1 + 1);
    }, [count1])

    const handleClick2 = useCallback(() => {
        setCount2(count2 + 1);
    }, [count2]);

    // alert("Parent rendered");
    console.log("Parent rendered");

    return (
        <div>
            <h2>Without useCallback:</h2>
            <p>Count 1: {count1}</p>
            <p>Count 2: {count2}</p>
            <Button onClick={handleClick1} text="Button 1" />
            <Button onClick={handleClick2} text="Button 2" />
        </div>
    );
}
