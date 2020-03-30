import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import { fillStudentDetails } from "../../common_store/actions/index";

const initialState={
  detailsSubmitted : false,
  studentDetails : {}
}

class Editdetails extends Component{

  constructor(props){
      super(props);      
      this.state = initialState;
      this.state.studentDetails = this.props.studentDetails;
      this.nameChangeHandler = this.nameChangeHandler.bind(this);
      this.dobChangeHandler = this.dobChangeHandler.bind(this);
      this.cityChangeHandler = this.cityChangeHandler.bind(this);
      this.stateChangeHandler = this.stateChangeHandler.bind(this);
      this.countryChangeHandler = this.countryChangeHandler.bind(this);
      this.objectiveChangeHandler = this.objectiveChangeHandler.bind(this);
      this.contactnoChangeHandler = this.contactnoChangeHandler.bind(this);
      this.submitStudentDetails = this.submitStudentDetails.bind(this);
  }

  nameChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.name = e.target.value;
    this.setState({studentDetails})
  }

  contactnoChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.contactno = e.target.value;
    this.setState({studentDetails})
  }

  dobChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.dob = e.target.value;
    this.setState({studentDetails})
  }

  cityChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.city = e.target.value;
    this.setState({studentDetails})
  }

  stateChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.state = e.target.value;
    this.setState({studentDetails})
  }

  countryChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.country = e.target.value;
    this.setState({studentDetails})
  }

  stateChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.state = e.target.value;
    this.setState({studentDetails})
  }

  objectiveChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.objective = e.target.value;
    this.setState({studentDetails})
  }

  dispatch = async (state) => {
    await this.props.fillStudentDetails(state)
    return this.props.studentDetails;
  }

  submitStudentDetails = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    console.log("Sending Data ", this.state.studentDetails);
    const data = {details : this.state.studentDetails , edit_details : true}
                  // edit_education_details : false, edit_experience_details : false}
    axios.post('http://localhost:3001/editstudentdetails', data)
      .then(response => {
        console.log("Edit Response: ", response);
        if (response.status === 200) {
          this.dispatch(this.state.studentDetails)
            .then(result => {
              this.setState({
                detailsSubmitted : true
              })
             console.log("Edited details: ", result);
            })
        }
    });
  }

  render() {
    let redirectVar = null;
    if (this.state.detailsSubmitted) {
      redirectVar = <Redirect to="/studentprofilepage" />
    }
    return(
      <div>
      {redirectVar}
        <br />
      <React.Fragment>
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Profile Overview</h2>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input onChange = {this.nameChangeHandler}placeholder={this.props.studentDetails.name}value={this.state.name}
                type="text" className="form-control" name="name" />
              </div>
              <div className="form-group">
                <label>Date Of Birth</label>
                <input onChange = {this.dobChangeHandler}placeholder={this.props.studentDetails.dob}value={this.state.dob}
                type="text" className="form-control" name="dob" />
              </div>
              <div className="form-group">
                <label>City</label>
                <input onChange = {this.cityChangeHandler}placeholder={this.props.studentDetails.city}value={this.state.city} 
                type="text" className="form-control" name="city" />
              </div>
              <div className="form-group">
                <label>State</label>
                <input onChange = {this.stateChangeHandler}placeholder={this.props.studentDetails.state} value={this.state.state}
                type="text" className="form-control" name="state" />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input onChange = {this.countryChangeHandler}placeholder={this.props.studentDetails.country} value={this.state.country}
                type="text" className="form-control" name="country" />
              </div>
              <div className="form-group">
                <label>Contact No:</label>
                <input onChange = {this.contactnoChangeHandler}placeholder={this.props.studentDetails.contactno} value={this.state.contactno}
                type="number" className="form-control" name="contactno" />
              </div>
              <div className="form-group">
                <label>Objective</label>
                <input onChange = {this.objectiveChangeHandler}placeholder={this.props.studentDetails.objective} value={this.state.objective}
                type="text" className="form-control" name="objective" />
              </div>
              <button type="button" onClick={this.submitStudentDetails} className="btn btn-primary">Save</button>    
            </div>
          </div>
        </div>
      </React.Fragment> 
      </div>
    )    
  }
}

function mapStateToProps(state) {
  return {
    studentDetails : state.studentDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillStudentDetails : (details) => dispatch(fillStudentDetails(details))
  }
}

// export default Editdetails;
export default connect(mapStateToProps, mapDispatchToProps)(Editdetails);
