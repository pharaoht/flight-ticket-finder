import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import '../BarChart/barchart.css'
import FlightContext from '../../Context/flight-context';

export default function BarChart() {
    const ctx = useContext(FlightContext);
    let flight1Label = `From ${ctx.selectedFlights[0].airportCodeFrom} to ${ctx.selectedFlights[0].airportCodeTo}`
    let flight1Depart = `Depart: ${ctx.selectedFlights[0].arriveDate} at ${ctx.selectedFlights[0].arriveTime}`
    let flight1Return = `Return: ${ctx.selectedFlights[0].departDate} at ${ctx.selectedFlights[0].departTime}`
    let flight1price = ctx.selectedFlights[0].price;
    let flight1Duration = convertSec(ctx.selectedFlights[0].totalDuration)
    let flight1stops = ctx.selectedFlights[0].totalStops === 2 ? 0 : ctx.selectedFlights[0].totalStops - 2
    let flight1Link = `${ctx.selectedFlights[0].link}`

    let flight2Label = `${ctx.selectedFlights[1].airportCodeFrom} to ${ctx.selectedFlights[1].airportCodeTo}`
    let flight2Depart = `Depart: ${ctx.selectedFlights[1].arriveDate} at ${ctx.selectedFlights[1].arriveTime}`
    let flight2Return = `Return: ${ctx.selectedFlights[1].departDate} at ${ctx.selectedFlights[1].departTime}`
    let flight2price = ctx.selectedFlights[1].price;
    let flight2stops = ctx.selectedFlights[1].totalStops === 2 ? 0 : ctx.selectedFlights[1].totalStops - 2
    let flight2Duration = convertSec(ctx.selectedFlights[1].totalDuration)
    let flight2Link = `${ctx.selectedFlights[1].link}`

    let flight3Label = `${ctx.selectedFlights[2].airportCodeFrom} to ${ctx.selectedFlights[2].airportCodeTo}`
    let flight3Depart = `Depart: ${ctx.selectedFlights[2].arriveDate} at ${ctx.selectedFlights[2].arriveTime}`
    let flight3Return = `Return: ${ctx.selectedFlights[2].departDate} at ${ctx.selectedFlights[2].departTime}`
    let flight3price = ctx.selectedFlights[2].price;
    let flight3stops = ctx.selectedFlights[2].totalStops === 2 ? 0 : ctx.selectedFlights[2].totalStops - 2
    let flight3Duration = convertSec(ctx.selectedFlights[2].totalDuration)
    let flight3Link = `${ctx.selectedFlights[2].link}`

    const data = {
        labels: [[flight1Label, flight1Depart, flight1Return], [flight2Label, flight2Depart, flight2Return], [flight3Label, flight3Depart, flight3Return]],
        datasets: [
            {
                label: 'Price $',
                data: [flight1price, flight2price, flight3price],
                backgroundColor: '#00a698',

            },
            {
                label: 'Duration (Hours)',
                data: [flight1Duration, flight2Duration, flight3Duration],
                backgroundColor: '#042759'
            },
            {
                label: 'Stops',
                data: [flight1stops, flight2stops, flight3stops],
                backgroundColor: '#DC143C'
            },
        ],

    };


    function convertSec(sec) {
        if (sec === undefined) {
            return 0;
        }
        var convert = function (x) { return (x < 10) ? "0" + x : x; }
        let hours = convert(parseInt(sec / (60 * 60)));
        hours = Number(hours)
        return hours;
    }

    return <Bar data={data} options={{
        onClick: (e, activeEls) => {
            let dataIndex = activeEls[0].index;
            if (dataIndex === 0) {
                window.open(flight1Link)
            } else if (dataIndex === 1) {
                window.open(flight2Link)
            } else {
                window.open(flight3Link)
            }
        },
        scales: {
            y: {
                ticks: {
                    max: 500,
                    min: 0,
                    stepSize: 50
                }
            }
        },
    }}

    />;
}
