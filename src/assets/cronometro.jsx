import PropTypes from 'prop-types';
import "./cronometro.css"

function Cronometro(props) {
    
    function increment(){
        props.reset()
        if(props.currentMinutes < 60) props.changeMinutes(e => e + 1)
    }
    function decrement(){
        props.reset()
        if(props.currentMinutes > 0) props.changeMinutes(e => e - 1)
    }


    return (
        <div id={`${props.tipo}-label`} className='cronometro'>
            <h2>{`${props.tipo} Length`}</h2>
            <div className='time-wrapper'>
                <button id={`${props.tipo}-increment`} onClick={increment} disabled={props.isStarted}>▲</button>
                <div id={`${props.tipo}-length`}> {props.currentMinutes} </div>
                <button id={`${props.tipo}-decrement`} onClick={decrement} disabled={props.isStarted}>▼</button>
            </div>
        </div>

    )
}

Cronometro.propsTypes = {
    tipo: PropTypes.string,
    currentMinutes: PropTypes.number,
    changeMinutes: PropTypes.func,
    isStarted: PropTypes.bool,
    reset: PropTypes.func
}

export default Cronometro