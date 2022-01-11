import React, { Component } from 'react'

import {Card,Button,Badge} from 'react-bootstrap'
import Axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";

import  '../../asset/style.css';

class Task extends Component {
    constructor(props) {
        super(props)


    }



    render() {
        return (
            <div>
            <Card className="mt-4 task-card" key={this.props.task.id}>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                    <p>Created on: {this.props.task.created_at}</p>
                    <p>Status:
                    { this.props.task.completed_at==null?
                    <Badge bg="warning" className="status-badge" >Ongoing</Badge>:
                    <Badge bg="success" className="status-badge" >Completed</Badge>
                    }

                    </p>
                    </Card.Subtitle>
                    <Card.Text>
                    {this.props.task.label}
                    </Card.Text>
                    <Link to={`/tasks/edit-task/${this.props.task.id}`} >
                        <Button variant="outline-primary" className="button-text">Edit</Button>
                    </Link>
                    { this.props.task.completed_at==null?
                     <Button variant="outline-success" className="ml-4 button-text">Complete</Button>:
                     <Button variant="outline-danger" className="ml-4 button-text">Uncomplete</Button>
                    }
                    </Card.Body>
            </Card>
            </div>
        )
    }
}
export default  Task
