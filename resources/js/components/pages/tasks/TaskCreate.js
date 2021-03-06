import React, { Component } from 'react'

import Axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link,withRouter } from "react-router-dom";
import {storeNewTask} from "../../../services/TaskService";
import {PUBLIC_URL} from "../../../constants"

import Swal from 'sweetalert2'
import { toast } from 'react-toastify';



import {Spinner,Button,Form,Card} from 'react-bootstrap'




import  '../../asset/style.css';

class TaskCreate extends Component {
    state ={
        isLoading:false,
        label:'',
        errors:[]
    }

    componentDidMount() {

    }

    handleInput = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submitForm = async(e)=>{
        e.preventDefault()
        const {history} = this.props
        this.setState({isLoading:true})
        const postBody={label:this.state.label}
        const submitDataResponse = await storeNewTask(postBody)
        if(submitDataResponse.status === 'success'){
            this.setState({label:" "})
            this.setState({isLoading:false})
            toast.success( submitDataResponse.message,{
                  autoClose:3000,
                 
            })


        }
        else{
            this.setState({isLoading:false,errors:submitDataResponse.data})
            toast.error(submitDataResponse.data[0],{
                autoClose:5000
          })

        }

    }



    render() {
        return (
            <div>
                <h3>Create New Task</h3>
                <div className="float-right">
                <Link to="/tasks">
                <Button variant="info">See all</Button>
                </Link>
                </div>
                <div className="clearfix"></div>

                <Row className="mt-2 justify-content-center">

                    <Col xs={12} md={7} className="task-create-col">
                        {this.state.isLoading &&(
                            <div className="text-center">
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                        )}
                        <Card className="">
                            <Card.Body>
                            <Form onSubmit={this.submitForm}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter Task Label</Form.Label>
                                <Form.Control as="textarea" rows={3} name="label" value={this.state.label} onChange={(e)=>this.handleInput(e)} />
                            </Form.Group>
                                {/* {this.state.errors &&
                                    <p className="text-danger">{this.state.errors[0]}</p>
                                } */}
                                { this.state.isLoading==true ?
                                    <Button variant="primary" size="lg" type="button" className="button-text" active disabled>Creating...</Button>:
                                    <Button variant="primary"  type="submit" active size="lg">Create Task</Button>
                                }
                            </Form>
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default  withRouter(TaskCreate)
