import React, { useContext } from 'react';
import Modal from 'react-modal'
import FlightContext from '../../Context/flight-context';


export default function Modals(props) {

    return (
        <Modal isOpen={props.isOpen} style={{ overlay: { zIndex: 999 } }} onRequestClose={() => props.onRequest()} >
            <h2>Test</h2>
        </Modal>
    )
}
