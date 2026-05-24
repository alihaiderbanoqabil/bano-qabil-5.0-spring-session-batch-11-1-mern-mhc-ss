import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/features/userSlice';

export const Contact = () => {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.value);
  const [search, setSearch] = useState("")

  return (
    <div>Contact  {count}
      <input className='border-secondary border-2' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />

    <button onClick={() => dispatch(fetchUsers(search))}>Fetch User</button></div>
  )
}
