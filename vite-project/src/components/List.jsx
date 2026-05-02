// import React, { useEffect, useState, useRef } from 'react';

import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";

export const List = () => {
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 200);

    // const { data: usersData, error: usersError, isLoading: usersIsLoading } = useFetch(`https://jsonplaceholder.typicode.com/users${debouncedSearch ? `?id=${debouncedSearch}` : ""
    //     }`);
    const { data, error, isLoading } = useFetch(`https://jsonplaceholder.typicode.com/users${debouncedSearch ? `?id=${debouncedSearch}` : ""
        }`);
    // const { data, error, isLoading } = useFetch(`https://jsonplaceholder.typicode.com/comments${debouncedSearch ? `?id=${debouncedSearch}` : ""
    //     }`);

    return (
        <>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users"
            />

            {isLoading && <h1>Fetching data...</h1>}
            {error && <h1>{error}</h1>}

            {data?.length > 0 ? (
                <ol>
                    {data.map((d) => (
                        <li key={d.id}>
                            {d.id} - {d.name}
                        </li>
                    ))}
                </ol>
            ) : (
                !isLoading && <h1>No data</h1>
            )}
        </>
    );
};

// export const List = () => {
//     const [name, setName] = useState("");
//     const [search, setSearch] = useState("");
//     const [debouncedSearch, setDebouncedSearch] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [data, setData] = useState([]);
//     const [error, setError] = useState("");

//     console.log({ isLoading, error, data });

//     // ✅ Debouncing effect
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setDebouncedSearch(search);
//         }, 200); // delay

//         return () => clearTimeout(timer);
//     }, [search]);

//     useEffect(() => {
//         const controller = new AbortController();
//         const signal = controller.signal;

//         let isCurrent = true; // 👈 track if this request is still valid

//         const getData = async () => {
//             setIsLoading(true);
//             setError("");

//             try {
//                 const response = await fetch(
//                     `https://jsonplaceholder.typicode.com/users${debouncedSearch ? `?id=${debouncedSearch}` : ""
//                     }`,
//                     { signal }
//                 );

//                 const result = await response.json();

//                 if (isCurrent) {
//                     setData(result);
//                 }
//             } catch (err) {
//                 if (err.name === "AbortError") {
//                     console.log("Request aborted");
//                 } else {
//                     if (isCurrent) {
//                         setError(err.message);
//                     }
//                 }
//             } finally {
//                 if (isCurrent) {
//                     setIsLoading(false);
//                 }
//             }
//         };

//         getData();

//         return () => {
//             isCurrent = false; // 👈 invalidate old request
//             controller.abort();
//         };
//     }, [debouncedSearch]);
//     // // ✅ Fetch with AbortController
//     // useEffect(() => {
//     //     const controller = new AbortController();
//     //     const signal = controller.signal;

//     //     const getData = async () => {
//     //         setIsLoading(true);
//     //         setError("");

//     //         try {
//     //             const response = await fetch(
//     //                 `https://jsonplaceholder.typicode.com/users${debouncedSearch ? `?id=${debouncedSearch}` : ''
//     //                 }`,
//     //                 { signal }
//     //             );

//     //             const result = await response.json();
//     //             setData(result);
//     //         } catch (err) {
//     //             if (err.name === "AbortError") {
//     //                 console.log("Request aborted");
//     //             } else {
//     //                 setError(err.message);
//     //             }
//     //         } finally {
//     //             setIsLoading(false);
//     //         }
//     //     };

//     //     getData();

//     //     // ✅ Cleanup = cancel previous request
//     //     return () => {
//     //         controller.abort();
//     //     };
//     // }, [debouncedSearch]);

//     return (
//         <>
//             <div>
//                 <input
//                     type="text"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     placeholder="Search users"
//                 />
//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Enter name"
//                 />
//             </div>

//             <div>
//                 {isLoading && <h1>Fetching data...</h1>}
//                 {error && <h1>{error}</h1>}

//                 {data?.length > 0 ? (
//                     <ol>
//                         {data.map((d) => (
//                             <li key={d.id}>
//                                 {d.id} - {d.name} - {d.email} - {d.phone}
//                             </li>
//                         ))}
//                     </ol>
//                 ) : (
//                     !isLoading && <h1>No data found</h1>
//                 )}
//             </div>
//         </>
//     );
// };

// export const List = () => {
//     const [name, setName] = useState("");
//     const [search, setSearch] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [data, setData] = useState([])
//     const [error, setError] = useState("")
//     console.log({ isLoading, error, data });

//     useEffect(() => {
//         const getData = async () => {
//             setIsLoading(true)
//             try {
//                 const response = await fetch(`https://jsonplaceholder.typicode.com/users${search ? `?id=${search}` : ''}`)
//                 console.log(response, "response");
//                 const data = await response.json()
//                 console.log(data, "data");
//                 setData(data)
//                 // setIsLoading(false)
//             } catch (error) {
//                 console.log(error, "error");
//                 setError(error?.message)
//                 // setIsLoading(false)

//             }
//             finally {
//                 setIsLoading(false)

//             }
//         }
//         getData()

//         //  return () => { }
//     }, [search])

//     return (
//         <>
//             <div>
//                 <input
//                     type="text"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     placeholder="Search users"
//                 />
//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Enter name"
//                 />


//             </div>
//             <div>
//                 {isLoading && <h1>Fetching data.</h1>}
//                 {error && <h1>{error}</h1>}
//                 {data?.length > 0 ? (
//                     <ol>
//                         {data.map(d => {
//                             return <li key={d.id}>{d.id} - {d.name} - {d.email} - {d.phone}</li>
//                         })}
//                     </ol>

//                 ) : (
//                     <h1>No data found</h1>
//                 )}
//             </div>
//         </>
//     )
// }
