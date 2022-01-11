import React, { Component } from 'react'

import {Card,Button,Badge,Modal} from 'react-bootstrap'
import Axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";

import  '../../asset/style.css';
import Swal from 'sweetalert2'
import {FaEye } from 'react-icons/fa';


class TaskDisplayModal extends Component {

    constructor(props) {
        super(props)


    }

    closeModal = ()=>{
       this.props.onClose()
    }


    render() {
        return (
            <div>
                <Modal show={this.props.isOpen}>
                <Modal.Header>
                <Modal.Title>Find Task Label Below</Modal.Title>
                <Button variant="dark" onClick={() => this.closeModal()}>
                    <span aria-hidden="true">&times;</span>
                </Button>
                </Modal.Header>
                    <Modal.Body><p>{this.props.taskLabel}</p></Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default  TaskDisplayModal
