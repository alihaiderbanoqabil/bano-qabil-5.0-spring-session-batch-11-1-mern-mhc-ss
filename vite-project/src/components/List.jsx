import React, { useEffect, useState } from 'react'

export const List = () => {
    const [name, setName] = useState("");
    // async function getData() {
    //     try {
    //         const response = await fetch('https://jsonplaceholder.typicode.com/users')
    //     } catch (error) {

    //     }
    // }
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                console.log(response, "response");
                const data = await response.json()
                console.log(data, "data");

            } catch (error) {
                console.log(error, "error");

            }
        }
        getData()

        //  return () => { }
    }, [])

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
            />
        </div>
    )
}
