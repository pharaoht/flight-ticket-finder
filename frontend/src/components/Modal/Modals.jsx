import React from 'react';
import Modal from 'react-modal'

export default function Modals(props) {
    return (
        <Modal isOpen={props.isOpen}>
            <h2>Test</h2>
        </Modal>
    )
}
