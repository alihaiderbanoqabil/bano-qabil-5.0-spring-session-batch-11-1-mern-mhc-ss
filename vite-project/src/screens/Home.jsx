import React from 'react'
import { Parent1 } from '../components/Parent1'
import { Users } from './Users'

export const Home = () => {
  return (
    <div>Home
      <Parent1 html={<h1>Hello world</h1>} component={<Users />} />
    </div>
  )
}
