import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';


function Contador(props) {

    const [breakNumber, setBreakNumber] = useState(props.breakNumber)
    const [sessionNumber, setSessionNumber] = useState(props.sessionNumber)

    const displaySeconds = String(props.seconds)[1] ? props.seconds : `0${props.seconds}`

    function countdown() {
        if (props.seconds == 0) {
            props.setSeconds(59)
            if (props.isBreak && breakNumber > 0) {
                setBreakNumber(e => e - 1)
            } else if (!props.isBreak && sessionNumber > 0) {
                setSessionNumber(e => e - 1)
            } else {
                setBreakNumber(props.breakNumber - 1)
                setSessionNumber(props.sessionNumber - 1)
                props.setIsBreak(e => !e)
            }
        } else {
            props.setSeconds(e => e - 1)
        }
    }

    function pauseResume() {
        props.setIsStarted(e => !e)
    }

    function pause() {
        props.setIsStarted(false)
    }

    useEffect(() => {
        let interval
        if (props.isStarted) {
            interval = setInterval(() => countdown(), 1000)
        }
        return () => clearInterval(interval)
    }, [props.isStarted, props.seconds])

    useEffect(() => {
        setBreakNumber(props.breakNumber)
        setSessionNumber(props.sessionNumber)
    }, [props.breakNumber, props.sessionNumber])

    return (
        <>
            <h2 id='timer-label'>{props.isBreak ? "Break" : "Session"}</h2>
            <section className='time-wrapper'>
                <div id='time-left'>
                    {props.isBreak ? breakNumber : sessionNumber}
                    :
                    {displaySeconds}
                </div>
                <div className='button-wrapper'>
                    <button id='start_stop' onClick={pauseResume}>Play</button>
                    <button id='pause' onClick={pause}>Pause</button>
                    <button id='reset' onClick={props.reset}>Reset</button>
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