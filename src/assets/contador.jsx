import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import "./contador.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faRepeat } from "@fortawesome/free-solid-svg-icons"


function Contador(props) {

    const [breakNumber, setBreakNumber] = useState(props.breakNumber)
    const [sessionNumber, setSessionNumber] = useState(props.sessionNumber)
    const [currentNumber,setCurrentNumber] = useState(props.isBreak?breakNumber:sessionNumber)

    const displayMinutes = String(currentNumber)[1] ? currentNumber : `0${currentNumber}`
    const displaySeconds = String(props.seconds)[1] ? props.seconds : `0${props.seconds}`


    function toggleBreak() {
        if (props.isBreak) {
            setBreakNumber(props.breakNumber)
        }
        else {
            setSessionNumber(props.sessionNumber)
        }
        props.setIsBreak(e => !e)
    }

    function countdown() {
        if (currentNumber == 0 && props.seconds == 0) {
            toggleBreak()
        }
        else if (props.seconds == 0) {
            setCurrentNumber(e=>e-1)
            props.setSeconds(59)
        }
        else {
            props.setSeconds(e => e - 1)
        }

        // Handle audio at 1 second
    }

    function pauseResume() {
        props.setIsStarted(e => !e)
    }

    function pause() {
        props.setIsStarted(false)
    }

    function playAudio() {
        const audio = document.getElementById("beep")
        audio.play()
        setTimeout(() => {
            resetAudio()
          }, 1000);
    }

    function resetAudio(){
        const audio = document.getElementById("beep")
        audio.pause()
        audio.currentTime = 0
    }

    useEffect(() => {
        let interval
        if (props.isStarted) {
            interval = setInterval(() => countdown(), 1000)
        }
        return () => clearInterval(interval)
    }, [currentNumber , props.isStarted, props.seconds])

    useEffect(() => {
        setBreakNumber(props.breakNumber)
        setSessionNumber(props.sessionNumber)
    }, [props.breakNumber, props.sessionNumber])

    useEffect(()=>{
        setCurrentNumber(props.isBreak?breakNumber:sessionNumber)
    }, [props.rerender,sessionNumber,breakNumber,props.isBreak])

    useEffect(()=>{
        if (currentNumber == 0 && props.seconds == 0){
            playAudio()
        }
    }, [currentNumber, props.seconds])

    return (
        <>
            <h2 id='timer-label'>{props.isBreak ? "Break" : "Session"}</h2>
            <section className='time-wrapper'>
                <div id='time-left'>
                    {displayMinutes}
                    :
                    {displaySeconds}
                </div>
                <div className='button-wrapper'>
                    <audio id='beep' src="./assets/sounds/digital-alarm-clock-151920.mp3"></audio>
                    <button id='start_stop' onClick={pauseResume}><FontAwesomeIcon icon={faPlay} /></button>
                    <button id='pause' onClick={pause}> <FontAwesomeIcon icon={faPause} /> </button>
                    <button id='reset' onClick={props.reset}><FontAwesomeIcon icon={faRepeat} /></button>
                </div>
            </section>
        </>
    )
}

Contador.propsTypes = {
    breakNumber: PropTypes.number,
    sessionNumber: PropTypes.number,
    isBreak: PropTypes.bool,
    setIsBreak: PropTypes.func,
    reset: PropTypes.func
}

export default Contador