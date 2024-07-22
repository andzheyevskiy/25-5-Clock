import { useState } from 'react'
import './App.css'
import Cronometro from "./assets/cronometro";

function App() {
  const [breakNumber, setBreakNumber] = useState(5)
  const [sessionNumber, setSessionNumber] = useState(25)

  return (
    <>
      <h1>25 + 5 Clock</h1>
      <section className='cronometro-wrapper'>
        <Cronometro
          tipo="break"
          currentMinutes={breakNumber}
          changeMinutes={setBreakNumber}
        />
        <Cronometro
          tipo="session"
          currentMinutes={sessionNumber}
          changeMinutes={setSessionNumber}
        />
      </section>
    </>
  )
}

export default App
