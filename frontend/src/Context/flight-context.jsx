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
        setFlightArray();
    }, [flightData])

    const setData = (data) => {
        if (selectedFlights.length === 3) {
            return false;
        }
        setFlightData(prev => {
            return {
                ...prev,
                id: data.id, airportCodeFrom: data.airportCodeFrom, airportCodeTo: data.airportCodeTo,
                price: data.price, totalDuration: data.totalDuration, totalStops: data.totalStops,
                bookingLink: data.bookingLink, countryFrom: data.countryFrom,
                countryTo: data.countryTo, departDate: data.departDate,
                departTime: data.departTime, arriveDate: data.arriveDate, arriveTime: data.arriveTime
            }
        })
    };

    const removeItem = (data) => {

        if (selectedFlights.length === 0) {
            return false
        }

        let arr = selectedFlights.filter((curr) => curr.id !== data.id);
        setSelectedFlights(prevState => { return arr })
    };

    const setFlightArray = () => {

        if (flightData.id === '') {
            return false;
        }
        setSelectedFlights(prevState => { return [...prevState, flightData] })
    };

    return <FlightContext.Provider value={{ flightData: flightData, setData: setData, removeItem, removeItem, selectedFlights: selectedFlights }}>{props.children}</FlightContext.Provider>
};


export default FlightContext;