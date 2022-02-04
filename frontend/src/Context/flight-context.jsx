import React, { useEffect, useState } from 'react';

const FlightContext = React.createContext({
    id: '', airportCodeFrom: '', airportCodeTo: '',
    price: '', totalDuration: '', totalStops: '', bookingLink: '',
    countryFrom: '', countryTo: '', departDate: '',
    departTime: '', arriveDate: '', arriveTime: ''
});

export const FlightContextProvider = (props) => {
    const [flightData, setFlightData] = useState({
        id: '', airportCodeFrom: '', airportCodeTo: '',
        price: '', totalDuration: '', totalStops: '', bookingLink: '',
        countryFrom: '', countryTo: '', departDate: '',
        departTime: '', arriveDate: '', arriveTime: ''
    });
    const [selectedFlights, setSelectedFlights] = useState([]);

    useEffect(() => {

    }, [flightData])

    const setData = (data) => {
        //add check if id is already in array, if so remove it
        console.log(data)
    }

    const setFlightArray = () => {

    }

    return <FlightContext.Provider value={{ flightData: flightData, setData: setData }}>{props.children}</FlightContext.Provider>
};


export default FlightContext;