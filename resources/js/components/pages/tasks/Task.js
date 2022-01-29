import React, { Component } from 'react'

import Axios from 'axios'
import Row from 'react-bootstrap/Row';
import {Card,Badge} from 'react-bootstrap'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import {FaEye,FaTrash,FaEdit ,FaCheck, FaUndo,FaPowerOff} from 'react-icons/fa';
import  '../../asset/style.css';





class Task extends Component {
    state ={
        BASE_URL:process.env.MIX_REACT_APP_BASE_URL,
    }

    setAsIncomplete(taskId){
        Swal.fire({
            title: 'Set task as incomplete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
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
          })

    }

    setAsCompleted(taskId){
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

    deleteTask(taskId){
        Swal.fire({
            title: 'Delete task?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`${this.state.BASE_URL}/tasks/${taskId}`)
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


    render() {
        return (
            <Card className="mt-4 task-card" key={this.props.task.id}>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                        <p>
                            <small>Created on: {this.props.task.created_at}</small>
                            { this.props.task.completed_at==null?
                                <Badge bg="warning" className="status-badge float-right" >Ongoing</Badge>:
                                <Badge bg="success" className="status-badge float-right" >Completed</Badge>
                            }
                        </p>
                        {this.props.task.completed_at &&
                            (<p><small>Completed on: {this.props.task.completed_at}</small></p>)

                        }
                    </Card.Subtitle>
                    <Card.Text>
                        {this.props.task.label}
                    </Card.Text>
                    <div className="d-flex icon-div">

                        <Link to={`/tasks/edit-task/${this.props.task.id}`} >
                            <FaEdit size="20" className="edit-icon" title="Edit Task"  />
                        </Link>

                        <Link  to="" onClick={e =>this.deleteTask(this.props.task.id)}>
                            <FaTrash size="20" className="delete-icon" title="Delete Task" />
                        </Link>

                        <Link  to="">
                            {this.props.task.completed_at==null?
                                <FaCheck size="20" className="check-icon" title="Complete Task" onClick={e =>this.setAsCompleted(this.props.task.id)} />:
                                <FaUndo size="19" className="check-icon" title="Set task as Incomplete" onClick={e =>this.setAsIncomplete(this.props.task.id)} />
                            }
                        </Link>

                    </div>
                    </Card.Body>
                </Card>
        )
    }
}
export default  Task
