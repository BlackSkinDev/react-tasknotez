import React, { Component } from 'react'

import Axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Spinner,Button} from 'react-bootstrap'
import { Link } from "react-router-dom";

import Task from "./Task"

import  '../../asset/style.css';

class TaskList extends Component {
    state ={
        taskList: [],
        counter:1,
        BASE_URL:process.env.MIX_REACT_APP_BASE_URL,
        isLoading:false
    }

    componentDidMount() {
        this.getAllTaskList()
    }

    getAllTaskList = () => {
        this.setState({isLoading:true})
         // call api to fetch tasks
         Axios.get(`${this.state.BASE_URL}/tasks`)
         .then(response=>{
             this.setState({taskList: response.data.data,isLoading:false})
         })
         .catch(err =>{
             console.error(err)
         })
    }

    render() {
        return (
            <div>
                <h3>Task Management</h3>
                <div className="float-right">
                    <Link to="/tasks/create">
                    <Button variant="info">+ Create New</Button>
                    </Link>
                </div>
                <div className="clearfix"></div>
                {this.state.isLoading &&(
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                )}
                { this.state.taskList.length > 0 ?

                <Row xs={1} md={3} className="g-3" className='mt-4'>
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
