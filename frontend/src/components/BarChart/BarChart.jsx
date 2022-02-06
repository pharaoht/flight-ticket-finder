import React from 'react';
import { CategoryScale } from 'chart.js';
import { Bar, Chart } from 'react-chartjs-2';
import '../BarChart/barchart.css'

export default function BarChart() {

    const data = {
        labels: ['Mon', 'Tue', 'Wed'],
        datasets: [{
            label: 'Weekly Sales',
            data: [18, 12, 6],
        }]
    };

    return <Bar data={data} />;
}
