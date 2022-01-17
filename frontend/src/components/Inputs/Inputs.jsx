import React from 'react'
import '../Inputs/Inputs.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export const FromAirport = React.forwardRef((props, ref) => (
    <>
        <div className='inputBx'>
            <p>From</p>
            <input type="text" name='from_airport' placeholder="JFK, MIA, LAX"
                onChange={props['onChange']} ref={ref} />
        </div>
    </>
));

export const ToAirport = React.forwardRef((props, ref) => (
    <>
        <div className='inputBx'>
            <p>To</p>
            <input type="text" name='to_airport' placeholder="JFK, MIA, LAX"
                onChange={props['onChange']} ref={ref} />
        </div>
    </>
));

export const CheckIn = ({ onChange, selected }) => {
    return (
        <div className='inputBx'>
            <p>Departure</p>
            <DatePicker name='departure' selected={selected} onChange={onChange} minDate={new Date()} placeholderText='mm/dd/yyyy' />
        </div>
    );
};

export const CheckOut = ({ onChange, selected }) => {
    return (
        <div className='inputBx'>
            <p>Return</p>
            <DatePicker name='departure' selected={selected} onChange={onChange} minDate={new Date()} placeholderText='mm/dd/yyyy' />
        </div>
    );
};

export const FindBtn = ({ onClick }) => {
    return (
        <div className='inputBx'>
            <p className='white'>_</p>
            <input type='Submit' value="Find" readOnly={true} onClick={onClick} />
        </div>
    );
};

//pass props
export const FromLocations = ({ name, id, onClick, key }) => {
    return (
        <>
            <li className="airports" key={key} onClick={onClick}> {name} </li>
        </>
    )
};

export const ToLocations = ({ name, id, onClick, }) => {
    return (
        <>
            <li className="airports" key={id} onClick={onClick}> {name} </li>
        </>
    );
};

