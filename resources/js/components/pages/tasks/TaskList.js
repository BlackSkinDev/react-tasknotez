import React, { Component } from 'react'

import Axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Task from "./Task"

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
                                <Task task={task}/>
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
