import React from 'react'
import ToggleButton from './ToggleButton'
import Timer from './timer/Timer'

function Pomodoro() {
  return (
   <div className='max-w-lg mx-auto my-4 flex flex-col items-center bg-white px-8 py-4 rounded-xl shadow shadow-slate-300'>
   <ToggleButton />
   <Timer />
   </div>
  )
}

export default Pomodoro
