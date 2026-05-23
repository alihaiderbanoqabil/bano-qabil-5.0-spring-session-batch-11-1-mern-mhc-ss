import React from 'react'
import { useSelector } from 'react-redux';

export const Contact = () => {
  const count = useSelector((state) => state.counter.value);

  return (
    <div>Contact  {count}</div>
  )
}
