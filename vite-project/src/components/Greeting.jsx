import React from 'react'

export const Greeting = ({ name, age, hobbies, obj, isStudent }) => {
    return (
        <>
            <h5>
                Hello Good Morning {name}, your age is {age},
            </h5>
            <pre>{JSON.stringify(obj, null, 4)}</pre>
            <ol>
                {hobbies.map((hobby, index) => {
                    // console.log(hobby, index);

                    return (
                        // <li key={index}>{hobby.toUpperCase()}
                        <li key={`${index}-${hobby}-${Math.random()}`}>{hobby.toUpperCase()}
                            <strong>({index})</strong>
                        </li>
                    )
                })}
            </ol>

        </>
    )
}

// export const Greeting = (props) => {
//     const { name = "Taqi", age, hobbies, obj: { name: objName, age: objAge, hobbies: objHobbies }, obj, isStudent } = props
//     console.log(props, "props", isStudent);

//     const object = {
//         "isStudent": true,
//         "obj": {
//             "name": "ali",
//             "age": 28,
//             "hobbies": [
//                 "playing",
//                 "teaching",
//                 "coding"
//             ]
//         },
//         name: "ali",
//         "age": 28,
//         "hobbies": [
//             "playing",
//             "teaching",
//             "coding"
//         ],
//         "full name": "Ali Haider"
//     }
//     console.log(object["full name"]);

//     return (
//         <>
//             {/* <h1>{props && props.obj && props.obj.address && props.obj.address.city}</h1> */}
//             <h1>{props?.obj?.address?.city}</h1>
//             <h5>
//                 {/* Hello Good Morning {name}, your age is {age}, {isStudent === true ? "you are a student": "you are not a student"} */}
//                 Hello Good Morning {name}, your age is {age}, {!isStudent ? "you are a student" : "you are not a student"}
//             </h5>
//             {/* <pre>{JSON.stringify(obj, null, 4)}</pre> */}
//             <ul>
//                 <li>Name: {objName}</li>
//                 <li>Age: {objAge}</li>
//                 <li>Hobbies:  <ul>
//                     {objHobbies.map((hobby, index) => {
//                         // console.log(hobby, index);

//                         return (
//                             // <li key={index}>{hobby.toUpperCase()}
//                             <li key={`${index}-${hobby}-${Math.random()}`}>{hobby.toUpperCase()}
//                                 <strong>({index})</strong>
//                             </li>
//                         )
//                     })}
//                 </ul></li>
//             </ul>
//             {/* <ul>
//                 <li>Name: {obj.name}</li>
//                 <li>Age: {obj.age}</li>
//                 <li>Hobbies:  <ul>
//                     {obj.hobbies.map((hobby, index) => {
//                         // console.log(hobby, index);

//                         return (
//                             // <li key={index}>{hobby.toUpperCase()}
//                             <li key={`${index}-${hobby}-${Math.random()}`}>{hobby.toUpperCase()}
//                                 <strong>({index})</strong>
//                             </li>
//                         )
//                     })}
//                 </ul></li>
//             </ul> */}
//             <ol>
//                 {hobbies.map((hobby, index) => {
//                     // console.log(hobby, index);

//                     return (
//                         // <li key={index}>{hobby.toUpperCase()}
//                         <li key={`${index}-${hobby}-${Math.random()}`}>{hobby.toUpperCase()}
//                             <strong>({index})</strong>
//                         </li>
//                     )
//                 })}
//             </ol>

//         </>
//     )
// }

// export const Greeting = (props) => {

//     console.log(props, "props");
//     return (
//         <>
//             <h5>
//                 Hello Good Morning {props.name}, your age is {props.age},
//             </h5>
//             <pre>{JSON.stringify(props.obj, null, 4)}</pre>
//             <ol>
//                 {props.hobbies.map((hobby, index) => {
//                     // console.log(hobby, index);

//                     return (
//                         // <li key={index}>{hobby.toUpperCase()}
//                         <li key={`${index}-${hobby}-${Math.random()}`}>{hobby.toUpperCase()}
//                             <strong>({index})</strong>
//                         </li>
//                     )
//                 })}
//             </ol>

//         </>
//     )
// }
