import React, { useEffect, useState } from 'react';
import { CabinDropDown } from '../../Inputs/Inputs';

const CabinModule = (props) => {

    const [adults, setAdults] = useState(1);
    const [infants, setInfants] = useState(0);
    const [children, setChildren] = useState(0);
    const total = 10;

    const triangle = () => {
        return (
            <div className="arrow-up"></div>
        )
    };

    const incrementAdult = () => {

        if (adults + children + infants === total) {
            //add css disabled class
            return false
        }
        let count = adults + 1
        setAdults(prevState => { return prevState + 1 });
        props.paramSetter({ adults: count });
    };

    const decrementAdult = () => {
        if (adults === 1) {
            //add css disable to mius btn
            return false;
        }
        let count = adults - 1
        setAdults(prevState => { return prevState - 1 });
        props.paramSetter({ adults: count });
    };

    const incrementChild = () => {
        if (adults + children + infants === total) {
            //add css disabled class
            return false
        }
        let count = children + 1
        setChildren(prevState => { return prevState + 1 })
        props.paramSetter({ children: count });
    };

    const decrementChild = () => {
        if (children === 0) {
            //add css disable to mius btn
            return props.paramSetter({ children: 0 });
        };
        let count = children - 1
        setChildren(prevState => { return prevState - 1 })
        props.paramSetter({ children: count });
    };

    const incrementInfant = () => {
        if (adults + children + infants === total) {
            //add css disabled class
            return false
        }
        let count = infants + 1
        setInfants(prevState => { return prevState + 1 })
        props.paramSetter({ infants: count });
    }

    const decrementInfant = () => {
        if (infants === 0) {
            return props.paramSetter({ infants: 0 });
        }
        let count = infants - 1
        setInfants(prevState => { return prevState - 1 })
        props.paramSetter({ infants: count });
    }

    useEffect(() => {
        props.changeCabin(adults, children, infants);
    }, [adults, infants, children]);

    return (
        <>
            {props.show ?
                <div className='sd-ca-cl-tr' onMouseLeave={(e) => props.liftState(e)} >
                    {triangle()}
                    <div className='sd-dropdown-holder'>
                        <h5 className='sd-cab-title'>Cabin Class</h5>
                        <CabinDropDown />
                        <div>
                            <div className='sd-travelers'>
                                <div className='sd-travel-type'>
                                    <h4>Adults</h4>
                                    <h6>Over 11</h6>
                                </div>
                                <div className='sd-number-of-travelers'>
                                    <div onClick={decrementAdult}>
                                        <ion-icon id="sd-icon-minus-ad" name="remove-circle-outline"></ion-icon>
                                    </div>
                                    <div>
                                        {adults}
                                    </div>
                                    <div onClick={incrementAdult}>
                                        <ion-icon id='sd-icon-plus-ad' name="add-circle-outline"></ion-icon>
                                    </div>
                                </div>
                            </div>
                            <div className='sd-travelers'>
                                <div className='sd-travel-type'>
                                    <h4>Children</h4>
                                    <h6>2 - 11</h6>
                                </div>
                                <div className='sd-number-of-travelers'>
                                    <div onClick={decrementChild}>
                                        <ion-icon id="sd-icon-minus-ad" name="remove-circle-outline"></ion-icon>
                                    </div>
                                    <div>
                                        {children}
                                    </div>
                                    <div onClick={incrementChild}>
                                        <ion-icon id='sd-icon-plus-ad' name="add-circle-outline"></ion-icon>
                                    </div>
                                </div>
                            </div>
                            <div className='sd-travelers'>
                                <div className='sd-travel-type'>
                                    <h4>Infants</h4>
                                    <h6>Under 2</h6>
                                </div>
                                <div className='sd-number-of-travelers'>
                                    <div onClick={decrementInfant}>
                                        <ion-icon id="sd-icon-minus-ad" name="remove-circle-outline"></ion-icon>
                                    </div>
                                    <div>
                                        {infants}
                                    </div>
                                    <div onClick={incrementInfant}>
                                        <ion-icon id='sd-icon-plus-ad' name="add-circle-outline"></ion-icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h6>Max 10 passengers</h6>
                    </div>
                </div>
                :
                null}
        </>
    )
}

export default CabinModule;