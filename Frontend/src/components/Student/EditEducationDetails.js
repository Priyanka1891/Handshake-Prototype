import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import { fillStudentDetails } from "../../common_store/actions/index";

const initialState={
  detailsSubmitted : false,
  studentDetails : {}
}

class EditEducationDetails extends Component{

  constructor(props){
      super(props);
      this.state= initialState;
      this.state.studentDetails = this.props.studentDetails;
      this.colgnameChangeHandler = this.colgnameChangeHandler.bind(this);
      this.locationChangeHandler = this.locationChangeHandler.bind(this);
      this.degreeChangeHandler = this.degreeChangeHandler.bind(this);
      this.majorChangeHandler = this.majorChangeHandler.bind(this);
      this.yearofpassingChangeHandler = this.yearofpassingChangeHandler.bind(this);
      this.cgpaChangeHandler = this.cgpaChangeHandler.bind(this);
      this.submitStudentDetails = this.submitStudentDetails.bind(this);
  }

  colgnameChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.colgname = e.target.value;
    this.setState({studentDetails})
  }

  locationChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.location = e.target.value;
    this.setState({studentDetails})
  }

  degreeChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.degree = e.target.value;
    this.setState({studentDetails})
  }

  majorChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.major = e.target.value;
    this.setState({studentDetails})
  }

  yearofpassingChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.yearofpassing = e.target.value;
    this.setState({studentDetails})
  }

  cgpaChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.cgpa = e.target.value;
    this.setState({studentDetails})
  }

  dispatch = async (state) => {
    await this.props.fillStudentDetails(state)
    return this.props.studentDetails;
  }


  submitStudentDetails = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    const data = {details : this.state.studentDetails,
                  edit_education_details : true}
    console.log("Sending Data ", data);
    axios.post('http://localhost:3001/editstudentdetails', data)
      .then(response => {
        console.log("Edit Education Response: ", response);
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
                <h2>Education Overview</h2>
              </div>
              <div className="form-group">
                <label>College Name</label>
                <input onChange = {this.colgnameChangeHandler}value={this.state.colgname} placeholder={this.props.studentDetails.colgname}
                type="text" className="form-control" name="colgname" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input onChange = {this.locationChangeHandler}value={this.state.location} placeholder={this.props.studentDetails.location}
                type="text" className="form-control" name="dob" />
              </div>
              <div className="form-group">
                <label>Degree</label>
                <input onChange = {this.degreeChangeHandler}value={this.state.degree} placeholder={this.props.studentDetails.degree}
                type="text" className="form-control" name="city" />
              </div>
              <div className="form-group">
                <label>Major</label>
                <input onChange = {this.majorChangeHandler}value={this.state.major} placeholder={this.props.studentDetails.major}
                type="text" className="form-control" name="state" />
              </div>
              <div className="form-group">
                <label>Year of Passing</label>
                <input onChange = {this.yearofpassingChangeHandler}value={this.state.yearofpassing} placeholder={this.props.studentDetails.yearofpassing}
                type="text" className="form-control" name="country" />
              </div>
              <div className="form-group">
                <label>CGPA</label>
                <input onChange = {this.cgpaChangeHandler}value={this.state.cgpa} placeholder={this.props.studentDetails.cgpa}
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

// export default EditEducationdetails;
export default connect(mapStateToProps, mapDispatchToProps)(EditEducationDetails);
