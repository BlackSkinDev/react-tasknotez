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
import Task from './Task'
import  '../../asset/style.css';
import { Alert } from 'bootstrap';
import {getSortedTask, getSortedTask2} from "../../../utils";


const SortableContainer = sortableContainer(({children}) => {
    return <div>{children}</div>;
  });

const SortableItem = sortableElement(({task}) =><Task  task={task}/>);


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
        Axios.get(`${this.state.BASE_URL}/setting-status`)
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
                    Axios.get(`${this.state.BASE_URL}/toggle-settings`)
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
            Axios.put(`${this.state.BASE_URL}/tasks/swap-sort-order`, { updatedTasks })
            .catch(err =>{
                Swal.fire(
                    'Error',
                    'Error encountered while processing!',
                    'error'
                  )

            });

    }


    onSortEnd = ({oldIndex, newIndex}) => {

        const oldTaskList = this.state.taskList;
        this.setState(({taskList}) => ({
          taskList: arrayMove(this.state.taskList, oldIndex, newIndex),
        }))
        const updatedTask = getSortedTask2(oldTaskList, this.state.taskList);
        this.updateSortOrderForTasks(updatedTask);
      };


    render() {
        return (
            <div>
                <h3>Task Management</h3>
                <div className="float-right d-flex btn-div">
                    <h5>You can drag and drop task to rearrange them</h5>
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
