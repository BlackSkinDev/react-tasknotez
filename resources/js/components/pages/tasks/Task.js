import React, { Component } from 'react'

import {Card,Button,Badge} from 'react-bootstrap'
import Axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";

import  '../../asset/style.css';
import Swal from 'sweetalert2'
import {FaEye } from 'react-icons/fa';
import TaskDisplayModal from './TaskDisplayModal';


class Task extends Component {
    constructor(props) {
        super(props)


    }
    state ={
        isLoading:false,
        label:'',
        errors:[],
        BASE_URL:process.env.MIX_REACT_APP_BASE_URL,
        openTaskModal: false,
        taskLabel: '',
    }


    setAsIncomplete = (taskId) => {
        Swal.fire({
            title: 'Set task as incomplete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.isConfirmed) {
                Axios.get(`${this.state.BASE_URL}/tasks/${taskId}/unset`)
                .then(response=>{
                    Swal.fire(
                        'Done!',
                        response.data.message,
                        'success'
                      )
                      .then((result) => {
                        location.reload();
                      });

                })
                .catch(err =>{
                    Swal.fire(
                        'Error',
                        'Error encountered while processing!',
                        'error'
                      )
                })

            }
         })
    }

    setAsCompleted = (taskId) => {
        Swal.fire({
            title: 'Set task as complete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
                Axios.get(`${this.state.BASE_URL}/tasks/${taskId}/set`)
                .then(response=>{
                    Swal.fire(
                        'Done!',
                        response.data.message,
                        'success'
                      )
                      .then((result) => {
                        location.reload();
                      });

                })
                .catch(err =>{
                    Swal.fire(
                        'Error',
                        'Error encountered while processing!',
                        'error'
                      )

                })
            }
         })
    }

    openModalWithItem = (task) => {
        this.setState({
            openTaskModal: true,
            taskLabel: task.label,

        })
    }
    onClose = ()=>{
        this.setState({openTaskModal: false,taskLabel:""})
    }


    render() {
        return (
            <div>
            <Card className="mt-4 task-card" key={this.props.task.id}>
                <Card.Body>
                    <Card.Title>
                        <p><FaEye  onClick={() => this.openModalWithItem(this.props.task)} /></p>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    <p>
                        <small>Created on: {this.props.task.created_at}</small>
                        { this.props.task.completed_at==null?
                            <Badge bg="warning" className="status-badge float-right" >Ongoing</Badge>:
                            <Badge bg="success" className="status-badge float-right" >Completed</Badge>
                        }
                    </p>

                    { this.props.task.completed_at &&
                         (<p><small>Completed on: {this.props.task.completed_at}</small></p>)

                    }
                    </Card.Subtitle>
                    <Card.Text>
                    {this.props.task.label}
                    </Card.Text>
                    <Link to={`/tasks/edit-task/${this.props.task.id}`} >
                        <Button variant="outline-primary" className="button-text">Edit</Button>
                    </Link>
                    { this.props.task.completed_at==null?
                     <Button variant="outline-success" className="ml-4 button-text" id={this.props.task.id} onClick={e => this.setAsCompleted(e.target.id)}>Complete</Button>:
                     <Button variant="outline-danger" className="ml-4 button-text" id={this.props.task.id} onClick={e => this.setAsIncomplete(e.target.id)}>Uncomplete</Button>
                    }
                    </Card.Body>
            </Card>
              <TaskDisplayModal isOpen={this.state.openTaskModal} taskLabel={this.state.taskLabel} onClose={this.onClose}/>
            </div>
        )
    }
}
export default  Task
