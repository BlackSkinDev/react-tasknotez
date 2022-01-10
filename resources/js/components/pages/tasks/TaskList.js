import React, { Component } from 'react'

import {Card,Button,Badge} from 'react-bootstrap'
import Axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import  '../../asset/style.css';

class TaskList extends Component {
    state ={
        taskList: [],
        counter:1,
        BASE_URL:process.env.MIX_REACT_APP_BASE_URL,
    }

    componentDidMount() {
        // call api to fetch tasks
        Axios.get(`${this.state.BASE_URL}/tasks`)
        .then(response=>{
            this.setState({taskList: response.data.data})
            console.log(this.state.taskList.length)
        })
        .catch(err =>{
            console.error(err)
        })
    }

    render() {
        return (
            <div>
                <h3>Task Management</h3>
                { this.state.taskList.length > 0 ?

                <Row xs={1} md={3} className="g-3">
                { Object.entries(this.state.taskList).map(([key, task]) => {
                     return (
                        <Col key={key}>
                            <Card className="mt-4 task-card">
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted">
                                    <p>Created on: {task.created_at}</p>
                                    <p>Status:
                                    { task.completed_at==null?
                                    <Badge bg="warning" className="status-badge" >Incomplete</Badge>:
                                    <Badge bg="success" className="status-badge" >Completed</Badge>
                                    }

                                    </p>
                                    </Card.Subtitle>
                                    <Card.Text>
                                    {task.label}
                                    </Card.Text>
                                    <Button variant="primary" className="button-text">Edit</Button>
                                    <Button variant="danger" className="ml-4 button-text">Unfinish</Button>
                                 </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
</Row>

                :<h4 className="mt-5">Oops! You have no task</h4>
                }


            </div>
        )
    }
}
export default  TaskList
