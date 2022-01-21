import React, { Component } from 'react'

import Axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Spinner,Button,Card,Badge} from 'react-bootstrap'

import { Link } from "react-router-dom";
import {storeNewTask} from "../../../services/TaskService";
import {getTaskLists} from "../../../services/TaskService";

import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import { arrayMove } from 'react-sortable-hoc';

import Swal from 'sweetalert2'

import {FaEye,FaTrash,FaEdit ,FaCheck, FaUndo,FaPowerOff} from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { css } from 'glamor';




import  '../../asset/style.css';
import { Alert } from 'bootstrap';
import {getSortedTask, getSortedTask2} from "../../../utils";

const BASE_URL = process.env.MIX_REACT_APP_BASE_URL;

const SortableContainer = sortableContainer(({children}) => {
    return <div>{children}</div>;
  });

function setAsIncomplete(taskId){
    Swal.fire({
        title: 'Set task as incomplete?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
            Axios.get(`${BASE_URL}/tasks/${taskId}/unset`)
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

function setAsCompleted(taskId){
    Swal.fire({
        title: 'Set task as complete?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
            Axios.get(`${BASE_URL}/tasks/${taskId}/set`)
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

function deleteTask(taskId){


    Swal.fire({
        title: 'Delete task?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
            Axios.delete(`${BASE_URL}/tasks/${taskId}`)
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

  const SortableItem = sortableElement(({task}) =><Card className="mt-4 task-card" key={task.id}>
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                <p>
                    <small>Created on: {task.created_at}</small>
                    { task.completed_at==null?
                        <Badge bg="warning" className="status-badge float-right" >Ongoing</Badge>:
                        <Badge bg="success" className="status-badge float-right" >Completed</Badge>
                    }
                </p>

                {task.completed_at &&
                    (<p><small>Completed on: {task.completed_at}</small></p>)

                }
                </Card.Subtitle>
                <Card.Text>
                {task.label}
                </Card.Text>
                <div className="d-flex icon-div">
                    <Link to={`/tasks/edit-task/${task.id}`} >
                        <FaEdit size="20" className="edit-icon" title="Edit Task"  />
                    </Link>
                    <Link  to="" onClick={e =>deleteTask(task.id)}>
                        <FaTrash size="20" className="delete-icon" title="Delete Task" />
                    </Link>
                    <Link  to="">
                        {task.completed_at==null?
                            <FaCheck size="20" className="check-icon" title="Complete Task" onClick={e =>setAsCompleted(task.id)} />:
                            <FaUndo size="19" className="check-icon" title="Set task as Incomplete" onClick={e =>setAsIncomplete(task.id)} />
                        }
                    </Link>

                </div>
                </Card.Body>
            </Card>);





class TaskList extends Component {
    state ={
        taskList: [],
        counter:1,
        BASE_URL:process.env.MIX_REACT_APP_BASE_URL,
        isLoading:false,
        label:'',
        errors:[],
        taskLabel: '',
        setting:''

    }

    async componentDidMount() {
       await this.getTasksLists()
       await this.getAllowDuplicateStatus()


    }

    getAllowDuplicateStatus = async ()=>{
        const response = await
        Axios.get(`${BASE_URL}/setting-status`)
        if(response.status==200) {
            this.setState({setting:response.data.data})
        }
        else{
            Swal.fire(
                'Error',
                'Error encountered while processing!',
                'error'
              )
        }

    }



    updateAllowDuplicateStatus = async ()=>{

        const response = await
            Swal.fire({
                title: 'Switch setting ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              })
              .then((result)=>{
                if (result.isConfirmed) {
                    Axios.get(`${BASE_URL}/toggle-settings`)
                    .then((response)=>{
                        const msg = response.data.data ? 'Setting turned on!' : 'Setting turned off!'
                        Swal.fire(
                            msg,
                            response.data.message,
                            'success'
                        )
                        .then(()=>{
                            this.setState({setting:response.data.data})
                            location.reload();
                        })

                    })
                    .catch((err)=>{
                        Swal.fire(
                            'Error',
                            'Error encountered while processing!',
                            'error'
                          )
                    })

                }
              })
    }

    getTasksLists = async () => {
        this.setState({ isLoading: true });
        const response = await getTaskLists();
        if (response.status === 'success') {
        this.setState({
            taskList: response.data,
            isLoading: false,
        });

        } else {
        this.setState({
            isLoading: false,
        });

        alert("An Error was encountered, try again later")
       }
    };

    updateSortOrderForTasks(updatedTasks) {
            Axios.put(`${BASE_URL}/tasks/swap-sort-order`, { updatedTasks })
            .catch(err =>{
                Swal.fire(
                    'Error',
                    'Error encountered while processing!',
                    'error'
                  )

            });

    }


    onSortEnd = ({oldIndex, newIndex}) => {
        console.log("task moved from position " + oldIndex + " to  position " + newIndex);
        const oldTaskList = this.state.taskList;
        this.setState(({taskList}) => ({
          taskList: arrayMove(this.state.taskList, oldIndex, newIndex),
        }))
        const updatedTask = getSortedTask2(oldTaskList, this.state.taskList);
        this.updateSortOrderForTasks(updatedTask);
      };

      onSortStart =({index, oldIndex, newIndex, collection, isKeySorting}, e)=>{
          if(!localStorage.getItem('hasToast')){
            toast.warning("Only one level dragging is allowed!. Otherwise won't be recorded",{
                autoClose:5000,
                position: toast.POSITION.BOTTOM_LEFT,
                onClose: () =>  localStorage.setItem('hasToast',true)
              })
          }

      }






    render() {
        return (
            <div>
                <h3>Task Management</h3>
                <div className="float-right d-flex btn-div">
                    <Link to="/tasks/create">
                    <Button variant="info" className="button-text">+ Create New</Button>
                    </Link>

                    <Link to="">

                    {this.state.setting== 0 && !this.state.isLoading ?
                           <Button variant="warning" className="button-status-text" onClick={this.updateAllowDuplicateStatus}><FaPowerOff/> Turn on allow <br/>duplicate labels setting</Button>:
                           <Button variant="danger" className="button-status-text" onClick={this.updateAllowDuplicateStatus}><FaPowerOff/>  Turn off allow <br/>duplicate labels setting</Button>
                        }


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

                    {this.state.taskList.length ?

                        <Row className="g-3" className='mt-4 justify-content-center'>
                        <Col xs={12} md={7}>
                        <SortableContainer onSortEnd={this.onSortEnd} distance={0} onSortStart={this.onSortStart} >
                        {this.state.taskList.map((task, index) => (
                            <SortableItem key={`item-${task.id}`} index={index} task={task} />

                        ))}
                        </SortableContainer>
                        </Col>

                        </Row>

                        :
                        <div>
                            {!this.state.isLoading && (
                            <Row className="g-3" className='mt-4 justify-content-center'>
                                <Col xs={12} md={6}>
                                <img  className="image" src={require('../../asset/task.png')}/>
                                </Col>
                                <Col xs={12} md={6}>
                                <h1 className="mt-5">Oops! You have no task</h1>
                                </Col>

                            </Row>
                            )}
                        </div>
                    }


            </div>
        )
    }
}
export default  TaskList
