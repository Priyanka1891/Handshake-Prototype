import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import { fillStudentDetails } from "../../common_store/actions/index";

const initialState={
  detailsSubmitted : false,
  studentDetails : {}
}

class EditExperiencedetails extends Component{

  constructor(props){
      super(props);
      this.state= initialState;
      this.state.studentDetails = this.props.studentDetails;
      this.companynameChangeHandler = this.companynameChangeHandler.bind(this);
      this.titleChangeHandler = this.titleChangeHandler.bind(this);
      this.companylocationChangeHandler = this.companylocationChangeHandler.bind(this);
      this.startdateChangeHandler = this.startdateChangeHandler.bind(this);
      this.enddateChangeHandler = this.enddateChangeHandler.bind(this);
      this.jobdetailsChangeHandler = this.jobdetailsChangeHandler.bind(this);
      this.skillsChangeHandler = this.skillsChangeHandler.bind(this);
      this.submitStudentDetails = this.submitStudentDetails.bind(this);
  }

  companynameChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.companyname = e.target.value;
    this.setState({studentDetails})
  }

  titleChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.title = e.target.value;
    this.setState({studentDetails})
  }

  companylocationChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.companylocation = e.target.value;
    this.setState({studentDetails})
  }

  startdateChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.startdate = e.target.value;
    this.setState({studentDetails})
  }

  enddateChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.enddate = e.target.value;
    this.setState({studentDetails})
  }

  jobdetailsChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.jobdetails = e.target.value;
    this.setState({studentDetails})
  }

  skillsChangeHandler = (e) => {
    var studentDetails = {...this.state.studentDetails}
    studentDetails.skills = e.target.value;
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
                  edit_experience_details : true}
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
                <h2>Experience Overview</h2>
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input onChange = {this.companynameChangeHandler}value={this.state.companyname} placeholder={this.props.studentDetails.companyname}
                type="text" className="form-control" name="companyname" />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input onChange = {this.titleChangeHandler}value={this.state.title} placeholder={this.props.studentDetails.title}
                type="text" className="form-control" name="dob" />
              </div>
              <div className="form-group">
                <label>Company Location</label>
                <input onChange = {this.companylocationChangeHandler}value={this.state.companylocationn} placeholder={this.props.studentDetails.companylocation}
                type="text" className="form-control" name="city" />
              </div>    
              <div className="form-group">
                <label>Start Date</label>
                <input onChange = {this.startdateChangeHandler}value={this.state.startdate} placeholder={this.props.studentDetails.startdate}
                type="text" className="form-control" name="state" />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input onChange = {this.enddateChangeHandler}value={this.state.enddate} placeholder={this.props.studentDetails.enddate}
                type="text" className="form-control" name="country" />
              </div>
              <div className="form-group">
                <label>Job Details</label>
                <input onChange = {this.jobdetailsChangeHandler}value={this.state.jobdetails} placeholder={this.props.studentDetails.jobdetails}
                type="text" className="form-control" name="objective" />
              </div>
              <div className="form-group">
                <label>Skills</label>
                <input onChange = {this.skillsChangeHandler}value={this.state.skills} placeholder={this.props.studentDetails.skills}
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

// export default EditExperiencedetails;
export default connect(mapStateToProps, mapDispatchToProps)(EditExperiencedetails);
