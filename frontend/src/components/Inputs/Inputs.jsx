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

export const CheckIn = React.forwardRef((props, ref) => (

    <div className='inputBx'>
        <p>Departure</p>
        <DatePicker name='departure' selected={props['selected']} onChange={props['onChange']} minDate={new Date()} placeholderText='mm/dd/yyyy' ref={ref} />
    </div>

));

export const CheckOut = React.forwardRef((props, ref) => (

    <div className='inputBx'>
        <p>Return</p>
        <DatePicker name='return' ref={ref} selected={props['selected']} onChange={props['onChange']} minDate={new Date()} placeholderText='mm/dd/yyyy' />
    </div>

));

export const FindBtn = ({ onClick }) => {
    return (
        <div className='inputBx'>
            <p className='white'>_</p>
            <input type='Submit' value="Find" readOnly={true} onClick={onClick} />
        </div>
    );
};

//pass props
export const FromLocations = ({ name, onClick, id }) => {
    return (
        <>
            <li className="airports" key={id} onClick={onClick}> {name} </li>
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

export const Cabin = React.forwardRef((props, ref) => (
    <>
        <div className='inputBx'>
            <p>Cabin, Class, & Travelers</p>
            <input type='text' onMouseEnter={props['onMouseEnter']} ref={ref} />
        </div>
    </>

))

export const CabinDropDown = (props) => {
    return (
        <>
            <select className='cab-dd'>
                <option value=''>Any</option>
                <option value='M'>Economy</option>
                <option value='W'>Premium Economy</option>
                <option value='C'>Business Class</option>
                <option value='F'>First Calss</option>
            </select>
        </>
    )
}