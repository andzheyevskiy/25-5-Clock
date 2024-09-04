import { useState } from 'react'
import './App.css'
import Cronometro from "./assets/cronometro";
import Contador from './assets/contador';


function App() {
  const [breakNumber, setBreakNumber] = useState(5)
  const [sessionNumber, setSessionNumber] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isBreak, setIsBreak] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [rerender, setRerender] = useState(false)

  function reset() {
    setBreakNumber(5)
    setSessionNumber(25)
    setSeconds(0)
    setIsBreak(false)
    setIsStarted(false)
    setRerender(e=>!e)
    document.getElementById('beep').pause()
    document.getElementById('beep').currentTime=0
  }

  function secondsReset(){
    setIsBreak(false)
    setSeconds(0)
  }

  return (
    <>
      <h1>25 + 5 Clock</h1>
      <section className='cronometro-wrapper'>
        <Cronometro
          tipo="break"
          currentMinutes={breakNumber}
          changeMinutes={setBreakNumber}
          isStarted={isStarted}
          reset={secondsReset}
        />
        <Cronometro
          tipo="session"
          currentMinutes={sessionNumber}
          changeMinutes={setSessionNumber}
          isStarted={isStarted}
          reset={secondsReset}
        />
      </section>
      <Contador
        breakNumber={breakNumber}
        sessionNumber={sessionNumber}
        isBreak={isBreak}
        setIsBreak={setIsBreak}
        reset={reset}
        isStarted={isStarted}
        setIsStarted={setIsStarted}
        seconds={seconds}
        setSeconds={setSeconds}
        rerender={rerender}
      />
    </>
  )
}

export default App
