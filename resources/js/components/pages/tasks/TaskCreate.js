import React, { Component } from 'react'

import Axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

import {Spinner,Button,Form,Card} from 'react-bootstrap'




import  '../../asset/style.css';

class TaskCreate extends Component {
    state ={

    }

    componentDidMount() {

    }



    render() {
        return (
            <div>
                <h3>Create New Task</h3>
                <div className="float-right">
                <Link to="/tasks">
                <Button variant="info">Sell all</Button>
                </Link>
                </div>
                <div className="clearfix"></div>
                <Card className="mt-4">
                <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    </Form>
                </Card.Body>
                </Card>
            </div>
        )
    }
}
export default  TaskCreate
