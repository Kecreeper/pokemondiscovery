import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className='bg-white/75 mx-auto max-w-3xl rounded-xl grid grid-cols-1'>
      <div className='text-2xl text-center py-4 font-sans font-bold'>
        Pokemon Discovery
      </div>
      <input className='max-w-xl mx-auto'></input>
      <div className='flex justify-around py-4'>
        <button className='bg-white py-1 px-6 rounded-lg border border-b-black border-r-black'>Query Pokemon</button>
        <button className='bg-white py-1 px-6 rounded-lg border border-b-black border-r-black'>Random Pokemon</button>
      </div>
      
    </div>
  )
}

export default App
