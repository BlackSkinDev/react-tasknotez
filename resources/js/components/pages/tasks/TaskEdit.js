import React, { Component } from 'react'

import Axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link,withRouter } from "react-router-dom";
import {getTask,updateTask} from "../../../services/TaskService";
import {PUBLIC_URL} from "../../../constants"
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';






import {Spinner,Button,Form,Card} from 'react-bootstrap'




import  '../../asset/style.css';

class TaskEdit extends Component {
    state ={
        isLoading:false,
        label:'',
        errors:[],
        BASE_URL:process.env.MIX_REACT_APP_BASE_URL,
        id:this.props.match.params.id
    }

    componentDidMount() {
        const {history} = this.props
        Axios.get(`${this.state.BASE_URL}/tasks/${this.state.id}`)
        .then(response=>{
            this.setState({label:response.data.data.label})
        })
        .catch(err =>{
            Swal.fire(
                'Error',
                err.response.data.message,
                'error'
              )

        })

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
        const submittedDataResponse = await updateTask(postBody,this.state.id)
        if(submittedDataResponse.status === 'success'){
              toast.success(  submittedDataResponse.message,{
                autoClose:3000
          })
            this.setState({isLoading:false})

        }
        else{
            this.setState({isLoading:false})
            toast.error(submittedDataResponse.data[0],{
                autoClose:5000
          })

        }

    }



    render() {
        return (
            <div>
                <h3>Edit Task</h3>
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
                        <Card className="task-create-card mt-5">
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
                                    <Button variant="primary" size="lg" type="button" className="button-text" active disabled>Updating...</Button>:
                                    <Button variant="primary"  type="submit" active size="lg">Update Task</Button>
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
export default  withRouter(TaskEdit)
