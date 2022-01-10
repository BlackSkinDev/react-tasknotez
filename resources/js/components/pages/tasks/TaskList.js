import React, { Component } from 'react'

import {Card,Button,Badge} from 'react-bootstrap'
import Axios from 'axios'


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
            console.log(this.state.taskList)
        })
        .catch(err =>{
            console.error(err)
        })
    }

    render() {
        return (
            <div>
                <h3>Task Management</h3>
                {Object.entries(this.state.taskList).map(([key, task]) => (
                     <Card className="mt-4" key={key}>
                     <Card.Body>
                         <Card.Subtitle className="mb-2 text-muted">
                             Status: <Badge bg="primary" className="status-badge" >{task.completed_at}</Badge>
                         </Card.Subtitle>
                         <Card.Text>
                        {task.label}
                         </Card.Text>
                         <Button variant="primary">Edit</Button>
                         <Button variant="danger" className="ml-4">Unfinish</Button>
                     </Card.Body>
                 </Card>
                ))}
            </div>
        )
    }
}
export default  TaskList
