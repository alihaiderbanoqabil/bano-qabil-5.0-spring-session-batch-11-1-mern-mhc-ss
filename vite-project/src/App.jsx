import React, { lazy, Suspense, useState } from 'react'
import { Counter } from './components/Counter'
import { Form } from './components/Form'
import { List } from './components/List'
import { Parent } from './components/Parent'
import { UseMemo } from './components/UseMemo'
import { UseCallback } from './components/UseCallback'
import { Component1 } from './components/Component1'
import { UserContext } from './context'
import { Todo } from './components/Todo'
import { Children } from './components/Children'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Layout } from './layouts/Layout'
import { UsersLayout } from './layouts/UsersLayout'

import { Home } from './screens/Home'
import { About } from './screens/About'
import { Contact } from './screens/Contact'
import { NotFound } from './screens/NotFound'
import { Users } from './screens/Users'
import { UserProfile } from './screens/UserProfile'
import { AntdPlayground } from './screens/AntdPlayground'
import { Products } from './screens/Products/products'

// with default export 
// const Layout = lazy(() => import("./layouts/Layout"));
// const UsersLayout = lazy(() => import("./layouts/UsersLayout"));

// const Home = lazy(() => import("./screens/Home"));
// const About = lazy(() => import("./screens/About"));
// const Contact = lazy(() => import("./screens/Contact"));
// const AntdPlayground = lazy(() => import("./screens/AntdPlayground"));
// const Users = lazy(() => import('./screens/Users'));
// const UserProfile = lazy(() => import('./screens/UserProfile'));
// const NotFound = lazy(() => import("./screens/NotFound"));

// const Layout = lazy(() =>
//   import("./layouts/Layout").then((m) => ({ default: m.Layout }))
// );

// const UsersLayout = lazy(() =>
//   import("./layouts/UsersLayout").then((m) => ({ default: m.UsersLayout }))
// );

// const Home = lazy(() =>
//   import("./screens/Home").then((m) => ({ default: m.Home }))
// );

// const About = lazy(() =>
//   import("./screens/About").then((m) => ({ default: m.About }))
// );

// const Contact = lazy(() =>
//   import("./screens/Contact").then((m) => ({ default: m.Contact }))
// );

// const AntdPlayground = lazy(() =>
//   import("./screens/AntdPlayground").then((m) => ({ default: m.AntdPlayground }))
// );

// const Users = lazy(() =>
//   import("./screens/Users").then((m) => ({ default: m.Users }))
// );

// const UserProfile = lazy(() =>
//   import("./screens/UserProfile").then((m) => ({ default: m.UserProfile }))
// );

// const NotFound = lazy(() =>
//   import("./screens/NotFound").then((m) => ({ default: m.NotFound }))
// );

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <Suspense fallback={<div>Loading layout...</div>}>
//         <Layout />
//       </Suspense>
//     ),
//     errorElement: <NotFound />,

//     children: [
//       {
//         index: true,
//         element: (
//           <Suspense fallback={<div>Loading...</div>}>
//             <Home />
//           </Suspense>
//         ),
//       },

//       {
//         path: "about",
//         element: (
//           <Suspense fallback={<div>Loading...</div>}>
//             <About />
//           </Suspense>
//         ),
//       },

//       {
//         path: "contact",
//         element: (
//           <Suspense fallback={<div>Loading...</div>}>
//             <Contact />
//           </Suspense>
//         ),
//       },

//       {
//         path: "antd-playground",
//         element: (
//           <Suspense fallback={<div>Loading...</div>}>
//             <AntdPlayground />
//           </Suspense>
//         ),
//       },

//       {
//         path: "users",
//         element: (
//           <Suspense fallback={<div>Loading users layout...</div>}>
//             <UsersLayout />
//           </Suspense>
//         ),

//         children: [
//           {
//             index: true,
//             element: (
//               <Suspense fallback={<div>Loading users...</div>}>
//                 <Users />
//               </Suspense>
//             ),
//           },
//           {
//             path: ":id",
//             element: (
//               <Suspense fallback={<div>Loading profile...</div>}>
//                 <UserProfile />
//               </Suspense>
//             ),
//           },
//         ],
//       },
//     ],
//   },
// ]);

// export default function App() {
//   return <RouterProvider router={router} />;
// }
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "about",
        element: <About />,
      },

      {
        path: "products",
        element: <Products />,
      },

      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "antd-playground",
        element: <AntdPlayground />,
      },

      {
        path: "users",
        element: <UsersLayout />,

        children: [
          {
            index: true,
            element: <Users />,
          },
          {
            path: ":id",
            element: <UserProfile />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

// // import './index.css'
// import App from './App.jsx'
// // import { App } from './App.jsx'
// // import { App as Ali } from './App.jsx'


// const App = () => {
//  const [user, setUser] = useState("Ali");
//   const [count, setCount] = useState(0)
//   const value = {
//     user: user,
//     count: count,
//     setUser: setUser,
//     setCount
//   }
//   return (
//      <UserContext.Provider value={value}>


//     <>
//      {/* <Counter/>
//      <Form/>
//      <List/>
//      <Parent/>
//      <UseMemo/> */}
//     {/* <UseCallback/>
//     <Component1/> */}
//     {/* <Todo/> */}
//     {/* <Children name={"ali"}/> */}
//     <Children name={"ali"}>
// <h1>Hello</h1>
//     </Children>
//     <Children name={"ali"}>
// <form action=""><input type="text" name="" id="" /></form>
//     </Children>
//     </>
//          </UserContext.Provider>
//   )
// }

// export default App

// import React, { Fragment, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import Header from './components/Header'
// import { Footer } from './components/Footer'
// // import './App.css'
// import { Blogs } from './screens/Blogs'
// import { Products } from './screens/Products/products'
// import { Greeting } from './components/Greeting'
// // const hobbies = ["coding", "teaching"];
// // // console.log(hobbies[0]);
// // // console.log(hobbies[1]);
// // const [hobby1, hobby2] = hobbies
// // console.log(hobby1);
// // console.log(hobby2);

// // let name = "hasnain";
// // if (name === undefined) {
// //     name = "ali"
// // }
// // const name = "hansain" || "Default";
// // const name = "" || "Default" ;
// // const name = undefined || "Default" ;
// // const name = "" ?? "Default" ;
// // const name = 0 ?? "Default" ;
// // const name = "undefined" ?? "Default";
// // const name = undefined ?? "Default";

// // console.log(name, "name");

// function App() {
//   // const [count, setCount] = useState(0);
//   // const state = useState(0)
//   // console.log(state, "state");

//   let count = 0;

//   return (
//     <>
//       <Header />
//       {/* <Greeting
//         // isStudent={true}
//         isStudent
//         obj={{ name: "ali", age: 28, hobbies: ["playing", "teaching", "coding"] }}
//         // obj2={{ name: "Ali", age: 20, hobbies: ["playing", "teaching", "coding"] }}
//         name={"ali"}
//         age={28} hobbies={["playing", "teaching", "coding"]} />
//       <Greeting obj={{
//         // name: "hasnain",
//         age: 26, hobbies: ["playing", "teaching", "coding"]
//       }}
//         //  name={"hasnain"}
//         age={26} hobbies={["playing", "teaching", "coding"]} /> */}
//       {/* <Blogs />
//       <Products /> */}
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         {/* <button
//           className="counter"
//           onClick={() => state[1]((count) => count + 1)}
//         >
//           Count is {state[0]}
//         </button> */}

//         <button
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
       
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//       <Footer />
//     </>
//   )
// }

// export default App

// // export function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <section id="center">
// //         <div className="hero">
// //           <img src={heroImg} className="base" width="170" height="179" alt="" />
// //           <img src={reactLogo} className="framework" alt="React logo" />
// //           <img src={viteLogo} className="vite" alt="Vite logo" />
// //         </div>
// //         <div>
// //           <h1>Get started</h1>
// //           <p>
// //             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
// //           </p>
// //         </div>
// //         <button
// //           className="counter"
// //           onClick={() => setCount((count) => count + 1)}
// //         >
// //           Count is {count}
// //         </button>
// //       </section>

// //       <div className="ticks"></div>

// //       <section id="next-steps">
// //         <div id="docs">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#documentation-icon"></use>
// //           </svg>
// //           <h2>Documentation</h2>
// //           <p>Your questions, answered</p>
// //           <ul>
// //             <li>
// //               <a href="https://vite.dev/" target="_blank">
// //                 <img className="logo" src={viteLogo} alt="" />
// //                 Explore Vite
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://react.dev/" target="_blank">
// //                 <img className="button-icon" src={reactLogo} alt="" />
// //                 Learn more
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //         <div id="social">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#social-icon"></use>
// //           </svg>
// //           <h2>Connect with us</h2>
// //           <p>Join the Vite community</p>
// //           <ul>
// //             <li>
// //               <a href="https://github.com/vitejs/vite" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#github-icon"></use>
// //                 </svg>
// //                 GitHub
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://chat.vite.dev/" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#discord-icon"></use>
// //                 </svg>
// //                 Discord
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://x.com/vite_js" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#x-icon"></use>
// //                 </svg>
// //                 X.com
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://bsky.app/profile/vite.dev" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#bluesky-icon"></use>
// //                 </svg>
// //                 Bluesky
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //       </section>

// //       <div className="ticks"></div>
// //       <section id="spacer"></section>
// //     </>
// //   )
// // }

// // export function Narbar() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <section id="center">
// //         <div className="hero">
// //           <img src={heroImg} className="base" width="170" height="179" alt="" />
// //           <img src={reactLogo} className="framework" alt="React logo" />
// //           <img src={viteLogo} className="vite" alt="Vite logo" />
// //         </div>
// //         <div>
// //           <h1>Get started</h1>
// //           <p>
// //             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
// //           </p>
// //         </div>
// //         <button
// //           className="counter"
// //           onClick={() => setCount((count) => count + 1)}
// //         >
// //           Count is {count}
// //         </button>
// //       </section>

// //       <div className="ticks"></div>

// //       <section id="next-steps">
// //         <div id="docs">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#documentation-icon"></use>
// //           </svg>
// //           <h2>Documentation</h2>
// //           <p>Your questions, answered</p>
// //           <ul>
// //             <li>
// //               <a href="https://vite.dev/" target="_blank">
// //                 <img className="logo" src={viteLogo} alt="" />
// //                 Explore Vite
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://react.dev/" target="_blank">
// //                 <img className="button-icon" src={reactLogo} alt="" />
// //                 Learn more
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //         <div id="social">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#social-icon"></use>
// //           </svg>
// //           <h2>Connect with us</h2>
// //           <p>Join the Vite community</p>
// //           <ul>
// //             <li>
// //               <a href="https://github.com/vitejs/vite" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#github-icon"></use>
// //                 </svg>
// //                 GitHub
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://chat.vite.dev/" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#discord-icon"></use>
// //                 </svg>
// //                 Discord
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://x.com/vite_js" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#x-icon"></use>
// //                 </svg>
// //                 X.com
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://bsky.app/profile/vite.dev" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#bluesky-icon"></use>
// //                 </svg>
// //                 Bluesky
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //       </section>

// //       <div className="ticks"></div>
// //       <section id="spacer"></section>
// //     </>
// //   )
// // }



// // const Navbar = ()=>{

// // }

// // export default Navbar


// // export const app = () => {
// //   return "Hello world", 20
// // }


// // export const App = () => {
// //   return (
// //     <div>
// //       <h1>Hello world</h1>
// //       <p>hello</p>
// //     </div>

// //   )
// // }

// // export const App = () => {
// //   return (
// //     <React.Fragment>
// //       <h1>Hello world</h1>
// //       <p>hello</p>
// //     </React.Fragment>
// //   )
// // }

// // export const App = () => {
// //   return (
// //     <Fragment>
// //       <h1>Hello world</h1>
// //       <p>hello</p>
// //     </Fragment>
// //   )
// // }

// // export const App = () => {
// //   return (
// //     <>
// //       <Header />
// //       <Header />
// //       <Header />
// //       <Header />
// //       <Header />
// //       <Header />
// //       <Header />
// //       <Header />
// //       <Header />
// //       <Header />
// //       <Header />
// //       <Header />
// //       <h1>Hello world</h1>
// //       <p>hello</p>
// //       <Footer />
// //     </>
// //   )
// // }
