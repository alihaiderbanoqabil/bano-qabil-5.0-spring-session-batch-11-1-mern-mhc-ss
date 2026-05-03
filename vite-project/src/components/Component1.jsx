import { useContext, useState } from "react";
import { UserContext } from "../context/inde";

export function Component1() {
  const state = useContext(UserContext)
  return (
    <>
      <h1>{`Hello ${state.user}!`}</h1>
      <Component2 />
    </>

  );
}
// export function Component1() {
//   const [user, setUser] = useState("Ali");
//   const [count, setCount] = useState(0)
//   const value = {
//     user: user,
//     count: count,
//     setUser: setUser,
//     setCount
//   }
//   return (
//     // <UserContext.Provider value={value}>
//     <UserContext.Provider value={user}>
//       <h1>{`Hello ${user}!`}</h1>
//       <Component2 />
//     </UserContext.Provider>
//   );
// }

function Component2() {
  // const user = useContext(UserContext);
  return (
    <>
      <h1>Component 2</h1>
      {/* <h2>{`Hello ${user} again!`}</h2> */}
      <Component3 />
    </>
  );
}

function Component3() {
  const state = useContext(UserContext);
  console.log(state, "state");
  // const user = useContext(UserContext);
  // console.log(user, "user");

  return (
    <>
      <h1>Component 3</h1>
      <h2>{`Hello ${state.user} again!`}</h2>
    </>
  );
}
// export function Component1() {
//   const [user, setUser] = useState("Ali");

//   return (
//     <>
//       <h1>{`Hello ${user}!`}</h1>
//       <Component2 user={user} />
//     </>
//   );
// }

// function Component2({ user }) {
//   return (
//     <>
//       <h1>Component 2</h1>
//       <Component3 user={user} />
//     </>
//   );
// }

// function Component3({ user }) {
//   return (
//     <>
//       <h1>Component 3</h1>
//       <h2>{`Hello ${user} again!`}</h2>
//     </>
//   );
// }