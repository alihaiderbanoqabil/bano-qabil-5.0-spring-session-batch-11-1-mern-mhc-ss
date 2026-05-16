import React, { useState } from "react";
import { Child } from "./Child";


export function Parent1({ html, component }) {
    const [message, setMessage] = useState("");

    const sendData = (data) => {
        console.log("data", data);

        setMessage(data);
    };

    return (
        <div>
            {html}
            {component}
            <h2>Parent Component</h2>
            <p>Message from child: {message}</p>

            <Child sendData={sendData} />
        </div>
    );
}
