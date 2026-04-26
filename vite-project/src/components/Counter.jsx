import React, { useState } from 'react'

export const Counter = () => {
    const [count, setCount] = useState(0);
    const add = () => {
        setCount(count + 1)
        console.log(count, "add");
    }

    const subtract = () => {
        setCount((prev) => prev - 1)
        console.log(count, "subtract");

    }
    // let count=0;


    // const add =()=>{
    //   count = count+1;
    //   // count +=1
    //   // count++
    //   console.log(count,"add");

    // }

    // const subtract =()=>{
    //   count = count-1;
    //   // count -=1
    //   // count--
    //   console.log(count,"subtract");

    // }
    return (
        <div>
            <button onClick={() => add()}>+</button>
            <span>{count}</span>
            {/* <button onClick={()=>subtract()}>-</button> */}
            <button onClick={() => {
                setCount((prev) => prev - 1)
                console.log(count, "subtract");
            }}>-</button>
            {/* <button onClick={add}>+</button>
        <span>{count}</span>
        <button onClick={subtract}>-</button> */}
            {/* <button onClick={add()}>+</button>
        <span>{count}</span>
        <button onClick={subtract()}>-</button> */}
        </div>
    )
}
