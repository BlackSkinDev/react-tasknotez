import React, { Component } from "react";
import ReactDOM from "react-dom";




class Counter extends Component {
  state = {
    counter:30
  }
  incrementCounter = (x)=>{
       let counter = this.state.counter+x
       this.setState({counter})

  }
  decrementCounter = (x)=>{
    let counter = this.state.counter-x
    this.setState({counter})

}

  render() {
    return (
      <div className="container mt-5">
        <h2>Test baf {this.state.counter}</h2>
        <p>
            <button className="btn btn-success btn-lg"onClick={()=>{this.incrementCounter(50)}}>+</button>
            <button className="btn btn-danger btn-lg ml-5"onClick={()=>{this.decrementCounter(50)}}>-</button>
        </p>
      </div>
    );
  }
}

export default Counter;

if (document.getElementById("counter")) {
  ReactDOM.render(<counter />, document.getElementById("counter"));
}
