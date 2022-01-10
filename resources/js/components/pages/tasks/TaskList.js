import React, { Component } from 'react'

import {Card,Button,Badge} from 'react-bootstrap'
import Axios from 'axios'


import  '../../asset/style.css';

class TaskList extends Component {
    state ={
        projectList: [],
        counter:1,
        BASE_URL:process.env.MIX_REACT_APP_BASE_URL,
    }

    componentDidMount() {
        // call api to fetch tasks
        console.log(process.env)
    }

    render() {
        return (
            <div>
                <h3>Task Management</h3>
                <div className="mt-3">
                <Card>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            Status: <Badge bg="primary" className="status-badge" >Primary</Badge>
                        </Card.Subtitle>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">Edit</Button>
                        <Button variant="success" className="ml-4">Finish task</Button>
                    </Card.Body>
                </Card>

                <Card className="mt-4">
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            Status: <Badge bg="primary" className="status-badge" >Primary</Badge>
                        </Card.Subtitle>
                        <Card.Text>
                        FaCheck
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">Edit</Button>
                        <Button variant="success" className="ml-4">Finish task</Button>
                    </Card.Body>
                </Card>

                <Card className="mt-4">
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            Status: <Badge bg="primary" className="status-badge" >Primary</Badge>
                        </Card.Subtitle>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">Edit</Button>
                        <Button variant="danger" className="ml-4">Unfinish</Button>
                    </Card.Body>
                </Card>



                </div>
            </div>
        )
    }
}
export default  TaskList
