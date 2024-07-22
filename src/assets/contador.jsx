import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';


function Contador(props) {

    const [isStarted, setIsStarted] = useState(false)
    const [breakNumber, setBreakNumber] = useState(props.breakNumber)
    const [sessionNumber, setSessionNumber] = useState(props.sessionNumber)
    const [seconds, setSeconds] = useState(2)

    function countdown() {
        if (seconds == 0) {
            setSeconds(59)
            if (props.isBreak && breakNumber > 0) {
                setBreakNumber(e => e - 1)
            } else if (!props.isBreak && sessionNumber > 0) {
                setSessionNumber(e => e - 1)
            } else {
                setBreakNumber(props.breakNumber)
                setSessionNumber(props.sessionNumber)
                props.setIsBreak(e => !e)
            }
        } else {
            setSeconds(e => e - 1)
        }
    }

    function pauseResume() {
        setIsStarted(e => !e)
    }

    useEffect(() => {
        let interval
        if (isStarted) {
            interval = setInterval(() => countdown(), 1000)
        }
        return () => clearInterval(interval)
    }, [isStarted, seconds])

    return (
        <section className='time-wrapper'>
            <div id='timer-label'>
                {props.isBreak ? breakNumber : sessionNumber}:{seconds}
            </div>
            <button onClick={pauseResume}>play</button>
        </section>

    )
}

Contador.propsTypes = {
    breakNumber: PropTypes.number,
    sessionNumber: PropTypes.number,
    isBreak: PropTypes.bool,
    setIsBreak: PropTypes.func,
}

export default Contador