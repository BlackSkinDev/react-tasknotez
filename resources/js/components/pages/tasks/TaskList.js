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

import {FaEye } from 'react-icons/fa';








import  '../../asset/style.css';

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
        if (result.isConfirmed) {
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

        }
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

  const SortableItem = sortableElement(({task}) =>   <Card className="mt-4 task-card" key={task.id}>
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
                <Link to={`/tasks/edit-task/${task.id}`} >
                    <Button variant="outline-primary" className="button-text">Edit</Button>
                </Link>
                {task.completed_at==null?
                <Button variant="outline-success" className="ml-4 button-text" id={task.id} onClick={e =>setAsCompleted(e.target.id)}>Mark as Complete</Button>:
                <Button variant="outline-danger" className="ml-4 button-text" id={task.id} onClick={e => setAsIncomplete(e.target.id)}>Unmark as complete</Button>
                }
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

    }

    componentDidMount() {
        this.getTasksLists()

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

    updateSortOrderForTasks(task1_id, task2_id) {
        if(task1_id !== task2_id) {
            Axios.put(`${BASE_URL}/tasks/${task1_id}/${task2_id}/swap-sort-order`)
            .then(response=>{
               console.log(response.data)

            })
            .catch(err =>{
                Swal.fire(
                    'Error',
                    'Error encountered while processing!',
                    'error'
                  )

            })
        }

    }


    onSortEnd = ({oldIndex, newIndex}) => {
        this.updateSortOrderForTasks(this.state.taskList[oldIndex].id,this.state.taskList[newIndex].id);
        this.setState(({taskList}) => ({
          taskList: arrayMove(this.state.taskList, oldIndex, newIndex),
        }));

      };



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

                    {this.state.taskList.length > 0  ?

                        <Row className="g-3" className='mt-4 justify-content-center'>
                        <Col xs={12} md={7}>
                        <SortableContainer onSortEnd={this.onSortEnd} distance={0} >
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
