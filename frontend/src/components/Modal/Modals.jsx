import React, { useContext } from 'react';
import Modal from 'react-modal'
import FlightContext from '../../Context/flight-context';
import BarChart from '../BarChart/BarChart';


export default function Modals(props) {

    return (
        <Modal isOpen={props.isOpen} style={{ overlay: { zIndex: 999 } }} onRequestClose={() => props.onRequest()} >
            <h3>Click the legend to adjust scale</h3>
            <BarChart />
        </Modal>
    )
}
