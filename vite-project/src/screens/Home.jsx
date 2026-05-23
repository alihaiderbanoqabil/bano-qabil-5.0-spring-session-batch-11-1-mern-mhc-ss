import React, { useState } from 'react'
import { Parent1 } from '../components/Parent1'
import { Users } from './Users'
import { useDispatch, useSelector } from 'react-redux'
import { counterSlice, decrement, decrementByAmount, increment, incrementByAmount } from '../store/features/counterSlice'

export const Home = () => {
  // const state = useSelector((state) => state);
  const value = useSelector((state) => state.counter.value);
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);
  // const { counter, cake } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  // console.log(state, "state");
  return (
    // <div>Home 
    //   {/* <h1 className="text-3xl font-bold underline md:text-[#fff] xl:text-green-600 text-yellow-500 h-[150px] rounded-4xl rounded-[5rem] bg-sky-500 hover:bg-sky-700 ">
    //     Hello world!
    //   </h1> */}
    //   <div className="bg-secondary border-8 border-solid border-primary text-primary p-6">
    //     Hello
    //   </div>
    //   {/* <Parent1 html={<h1>Hello world</h1>} component={<Users />} /> */}
    //   <Parent1 />
    // </div>
    <div className='flex gap-2 flex-wrap'>

      <input className='border-secondary border-2' type="number" value={count} onChange={(e) => setCount(+e.target.value)} />
      <br />
      {/* <button className='border-secondary border-2 cursor-pointer px-4' onClick={() => increment()}>Add</button> */}
      <button className='border-secondary border-2 cursor-pointer px-4' onClick={() => dispatch(increment())}>Add</button>
      <button className='border-secondary border-2 cursor-pointer px-4' onClick={() => dispatch(incrementByAmount(count))}>Add By Amount</button>
      {/* <button className='border-secondary border-2 cursor-pointer px-4' onClick={() => counterSlice.actions.increment()}>Add</button> */}
      {/* <span className='text-secondary font-bold mx-4'>{state.counter.value}</span>
      <span className='text-secondary font-bold mx-4'>{state.cake.numOfCakes}</span> */}
      <span className='text-secondary font-bold mx-4'>{value}</span>
      <span className='text-secondary font-bold mx-4'>{numOfCakes}</span>
      {/* <span className='text-secondary font-bold mx-4'>{counter.value}</span>
      <span className='text-secondary font-bold mx-4'>{cake.numOfCakes}</span> */}
      <button className='border-secondary border-2 cursor-pointer px-4' onClick={() => dispatch(decrement())}>Subtract</button>
      <button className='border-secondary border-2 cursor-pointer px-4' onClick={() => dispatch(decrementByAmount(count))}>Subtract By Amount</button>
    </div>
  )
}
