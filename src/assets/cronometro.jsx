import PropTypes from 'prop-types';
import "./cronometro.css"

function Cronometro(props) {
    
    function increment(){
        if(props.currentMinutes < 60) props.changeMinutes(e => e + 1)
    }
    function decrement(){
        if(props.currentMinutes > 0) props.changeMinutes(e => e - 1)
    }


    return (
        <div id={`${props.tipo}-label`} className='cronometro'>
            <h2>{`${props.tipo} Session`}</h2>
            <div className='time-wrapper'>
                <button id={`${props.tipo}-increment`} onClick={increment}>▲</button>
                <div id={`${props.tipo}-increment`}> {props.currentMinutes} </div>
                <button id={`${props.tipo}-decrement`} onClick={decrement}>▼</button>
            </div>
        </div>

    )
}

Cronometro.propsTypes = {
    tipo: PropTypes.string,
    currentMinutes: PropTypes.number,
    changeMinutes: PropTypes.func,
}

export default Cronometro