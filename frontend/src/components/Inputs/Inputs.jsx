import React from 'react'
import '../Inputs/Inputs.css';


export const FromAirport = React.forwardRef((props, ref) => (
    <>
        <div className='inputBx'>
            <p>From:</p>
            <input type="text" name='from_airport' placeholder="JFK, MIA, LAX"
                onChange={props['onChange']} ref={ref} />
        </div>
    </>
));

export const toAirport = React.forwardRef((props, ref) => (
    <>
        <div className='inputBx'>
            <p>To:</p>
            <input type="text" name='to_airport' placeholder="JFK, MIA, LAX"
                onChange={props['onChange']} ref={ref} />
        </div>
    </>
));

export const checkIn = ({ onChange }) => {
    return (
        <div className='inputBx'>
            <p>Departure</p>
            <input type='date' name='departure' onChange={onChange} minDate={new Date()} />
        </div>
    );
};

export const checkOut = ({ onChange }) => {
    return (
        <div className='inputBx'>
            <p>Return</p>
            <input type='date' name='return' onChange={onChange} />
        </div>
    );
};

export const findBtn = ({ onClick }) => {
    return (
        <div className='inputBx'>
            <p className='white'>_</p>
            <input type='Submit' value="Find" readOnly={true} onClick={onClick} />
        </div>
    );
};

//pass props
export const fromLocations = ({ name, id, onClick, key }) => {
    return (
        <>
            <li className="airports" key={key} onClick={onClick}> {name} </li>
        </>
    )
};

export const toLocations = ({ name, id, onClick, }) => {
    return (
        <>
            <li className="airports" key={id} onClick={onClick}> {name} </li>
        </>
    );
};

