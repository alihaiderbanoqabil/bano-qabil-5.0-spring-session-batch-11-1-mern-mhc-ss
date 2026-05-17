import React from 'react'
import { Parent1 } from '../components/Parent1'
import { Users } from './Users'

export const Home = () => {
  return (
    <div>Home
      {/* <h1 className="text-3xl font-bold underline md:text-[#fff] xl:text-green-600 text-yellow-500 h-[150px] rounded-4xl rounded-[5rem] bg-sky-500 hover:bg-sky-700 ">
        Hello world!
      </h1> */}
      <div className="bg-secondary border-8 border-solid border-primary text-primary p-6">
        Hello
      </div>
      <Parent1 html={<h1>Hello world</h1>} component={<Users />} />
    </div>
  )
}
