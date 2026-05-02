import React, { useState } from 'react'
import { Child1 } from './Child1'

export const Parent = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    const add = () => {
        setCount(count + 1)
    }

    const subtract = () => {
        setCount((prev) => prev - 1)

    }
    console.log("Parent rerender");

    return (
        <div>Parent
            <button onClick={add}>+</button>
            <span>{count}</span>
            <button onClick={subtract}>-</button>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
            />
            <Child1 count={count} update={() => {
                console.log("updating");
            }} />
        </div>
    )
}
