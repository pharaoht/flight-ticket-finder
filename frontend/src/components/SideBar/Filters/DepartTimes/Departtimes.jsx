import React, { useState } from 'react'
import './DepartTimes.css'
import RangeSlider from '../../../Slider/Slider';


export default function Departtimes(props) {
    const [isHidden, setIsHidden] = useState(true);
    const [obStart, setObStart] = useState('12:00 AM');
    const [ObEnd, setObEnd] = useState('11:00 PM');
    const [returnStart, setReturnStart] = useState('12:00 AM');
    const [returnEnd, setReturnEnd] = useState('11:00 PM');

    const toggleHandler = () => {
        if (isHidden) {
            setIsHidden(false);
        } else {
            setIsHidden(true)
        }
    };

    const showDownArrow = () => {
        return (
            <span className="so-icon so-hover"> <ion-icon name="chevron-down-outline" onClick={toggleHandler}></ion-icon></span>
        )
    }

    const showUpArrow = () => {
        return (
            <span className="so-icon so-hover"> <ion-icon name="chevron-up-outline" onClick={toggleHandler}></ion-icon></span>
        )
    }

    const convertTime = (num) => {

        let time = `${num}:00:00`

        const time_part_array = time.split(":");
        let ampm = 'AM';
        if (time_part_array[0] >= 12) {
            ampm = 'PM';
        }
        if (time_part_array[0] > 12) {
            time_part_array[0] = time_part_array[0] - 12;
        }
        if (time_part_array[0] == '0') {
            time_part_array[0] = '12'
        }

        const formatted_time = time_part_array[0] + ':' + time_part_array[1] + ' ' + ampm;

        return formatted_time
    };

    const updateOb = (num) => {
        const updateStartTime = convertTime(num[0]);
        const updateEndTime = convertTime(num[1]);
        props.liftState(num)
        setObStart(prevState => { return updateStartTime });
        setObEnd(prevState => { return updateEndTime });
    }

    const updateReturn = (num) => {
        const updateStartTime = convertTime(num[0]);
        const updateEndTime = convertTime(num[1]);
        setReturnStart(prevState => { return updateStartTime });
        setReturnEnd(prevState => { return updateEndTime });
    }

    const showSlider = () => {
        return (
            <>
                <div className='dt-outbound'>
                    <h4>Outbound</h4>
                    <h5>{obStart} - {ObEnd}</h5>
                </div>
                <div>
                    <RangeSlider single={false} return={false} updateOb={updateOb} />
                </div>

                <div className='dt-outbound'>
                    <h4>Return</h4>
                    <h5>{returnStart} - {returnEnd}</h5>
                </div>
                <div>
                    <RangeSlider single={false} return={true} updateReturn={updateReturn} />
                </div>
            </>
        )
    }



    return (
        <div className='dt-parent'>
            <div className='dt-header'>
                <div>
                    <h3>Departure Times</h3>
                </div>
                <div className='dt-collaspe'>
                    {!isHidden ? showDownArrow() : showUpArrow()}
                </div>
            </div>
            <div className='dt-slider-holder'>
                {!isHidden ? showSlider() : null}
            </div>
        </div >
    )
};
