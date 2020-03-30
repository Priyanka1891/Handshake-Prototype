import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';

const initialState={
  jobPosted : false,
  jobTitle : '',
  createDate : '',
  endDate : '',
  jobLocation : '',
  jobSalary : '',
  jobDescription : '',
  jobCategory: '',
  companyName : ''
}

class PostJob extends Component{

  constructor(props){
      super(props);
      this.state= initialState;
      this.state.companyName = this.props.employerDetails.name;
      this.jobTitleChangeHandler = this.jobTitleChangeHandler.bind(this);
      this.createDateChangeHandler = this.createDateChangeHandler.bind(this);
      this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
      this.jobLocationChangeHandler = this.jobLocationChangeHandler.bind(this);
      this.jobSalaryChangeHandler = this.jobSalaryChangeHandler.bind(this);
      this.jobDescriptionChangeHandler = this.jobDescriptionChangeHandler.bind(this);
      this.jobCategoryChangeHandler = this.jobCategoryChangeHandler.bind(this);
      this.postJobDetails = this.postJobDetails.bind(this);
  }

  jobTitleChangeHandler = (e) => {
    this.setState({
      jobTitle : e.target.value
    })
  }

  createDateChangeHandler = (e) => {
    this.setState({
      createDate : e.target.value
    })
  }

  endDateChangeHandler = (e) => {
    this.setState({
      endDate : e.target.value
    })
  }

  jobLocationChangeHandler = (e) => {
    this.setState({
      jobLocation : e.target.value
    })
  }

  jobSalaryChangeHandler = (e) => {
    this.setState({
      jobSalary : e.target.value
    })
  }

  jobDescriptionChangeHandler = (e) => {
    this.setState({
      jobDescription : e.target.value
    })
  }

  jobCategoryChangeHandler = (e) => {
    this.setState({
      jobCategory : e.target.value
    })
  }

  postJobDetails = (e) => {
    e.preventDefault();
    console.log("HERE", this.state, this.props.employerDetails)
    for (let [key, value] of Object.entries(this.state)) {
      if (key === 'jobPosted') continue;
      if (!value) {
        var msg;
        if (key === 'companyName') msg = 'Please login and try again...';
        else msg = 'Enter all required fields';
        window.alert(msg);
        return;
      }
    }

    axios.defaults.withCredentials = true;
    const data = this.state;
    console.log("Sending Data ", data);
    axios.post('http://localhost:3001/jobs/postjob', data)
      .then(response => {
        console.log("Edit Education Response: ", response);
        if (response.status === 200) {
          this.setState({
            jobPosted : true
          });
          window.alert("Job posted successfully")
        }
    });
  }

  render() {
    let redirectVar = null;
    if (this.state.jobPosted) {
      redirectVar = <Redirect to="/employerjobs" />
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
                <h2>Job Details</h2>
              </div>
              <div className="form-group">
                <label>Job Title*</label>
                <input onChange = {this.jobTitleChangeHandler}value={this.state.jobTitle} 
                type="text" className="form-control" name="colgname" />
              </div>
              <div className="form-group">
                <label>Create Date*</label>
                <input onChange = {this.createDateChangeHandler}value={this.state.createDate} 
                type="text" className="form-control" name="dob" />
              </div>
              <div className="form-group">
                <label>End Date*</label>
                <input onChange = {this.endDateChangeHandler}value={this.state.endDate} 
                type="text" className="form-control" name="city" />
              </div>
              <div className="form-group">
                <label>Location*</label>
                <input onChange = {this.jobLocationChangeHandler}value={this.state.jobLocation} 
                type="text" className="form-control" name="state" />
              </div>
              <div className="form-group">
                <label>Salary*</label>
                <input onChange = {this.jobSalaryChangeHandler}value={this.state.jobSalary} 
                type="text" className="form-control" name="country" />
              </div>
              <div className="form-group">
                <label>Job Description*</label>
                <input onChange = {this.jobDescriptionChangeHandler}value={this.state.jobDescription} 
                type="text" className="form-control" name="objective" />
              </div>
              <div className="form-group">
                <label>Job Type*</label>
                <select id="types" onChange = {this.jobCategoryChangeHandler} value={this.state.jobCategory}>
                  <option value="">----Job Type----</option>
                  <option value="fulltime">Full Time</option>
                  <option value="parttime">Part Time</option>
                  <option value="oncampus">On Campus</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <button type="button" onClick={this.postJobDetails} className="btn btn-primary">Post Job</button>    
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
    employerDetails : state.employerDetails
  }
}

// export default PostJob;
export default connect(mapStateToProps, null)(PostJob);
