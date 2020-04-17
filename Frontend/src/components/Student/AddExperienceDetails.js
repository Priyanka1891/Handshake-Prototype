import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import { fillStudentDetails } from "../../common_store/actions/login";
import { backendURL } from   "../../Utils/config";
import StudentNavbar from './StudentNavbar';


const initialState={
  detailsSubmitted : false,
  studentDetails : null,
  newExperinceDetails : {}
}

class AddExperienceDetails extends Component{

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
    var newExperinceDetails = this.state.newExperinceDetails;
    newExperinceDetails.companyname = e.target.value;
    this.setState({ newExperinceDetails: newExperinceDetails});
  }

  titleChangeHandler = (e) => {
    var newExperinceDetails = this.state.newExperinceDetails;
    newExperinceDetails.title = e.target.value;
    this.setState({ newExperinceDetails: newExperinceDetails});
  }

  companylocationChangeHandler = (e) => {
    var newExperinceDetails = this.state.newExperinceDetails;
    newExperinceDetails.companylocationn = e.target.value;
    this.setState({ newExperinceDetails: newExperinceDetails});
  }

  startdateChangeHandler = (e) => {
    var newExperinceDetails = this.state.newExperinceDetails;
    newExperinceDetails.startdate = e.target.value;
    this.setState({ newExperinceDetails: newExperinceDetails});
  }

  enddateChangeHandler = (e) => {
    var newExperinceDetails = this.state.newExperinceDetails;
    newExperinceDetails.enddate = e.target.value;
    this.setState({ newExperinceDetails: newExperinceDetails});
  }

  jobdetailsChangeHandler = (e) => {
    var newExperinceDetails = this.state.newExperinceDetails;
    newExperinceDetails.jobdetails = e.target.value;
    this.setState({ newExperinceDetails: newExperinceDetails});
  }

  skillsChangeHandler = (e) => {
    var newExperinceDetails = this.state.newExperinceDetails;
    newExperinceDetails.skills = e.target.value;
    this.setState({ newExperinceDetails: newExperinceDetails});
  }

  dispatch = async (state) => {
    await this.props.fillStudentDetails(state)
    return this.props.studentDetails;
  }


  submitStudentDetails = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    this.state.studentDetails.studentExperience.push(this.state.newExperinceDetails);
    const data = {details : this.state.studentDetails,
                  edit_experience_details : true}
    axios.post(`${backendURL}/student/editdetails`, data)
      .then(response => {
        console.log("Edit Experience Response: ", response);
        if (response.status === 200) {
          this.dispatch(this.state.studentDetails)
            .then(result => {
              this.setState({
                detailsSubmitted : true
              })
             console.log("Edited details: ", result.details);
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
      <React.Fragment>
      <br />
      <StudentNavbar/>
      <div className="col-md-offset-0">
           <div className="profile-content">
              <div className="col-md-offset-4">
                <h2>Add Experience</h2>
                <label>Company Name</label>
                <input style={{width:"300px"}} onChange = {this.companynameChangeHandler}value={this.state.companyname}
                type="text" className="form-control" placeholder="Company Name" />
                <br />
                <label>Title</label>
                <input style={{width:"300px"}} onChange = {this.titleChangeHandler}value={this.state.title}
                type="text" className="form-control" placeholder="Job Title" />
                <br />
                <label>Company Location</label>
                <input style={{width:"300px"}} onChange = {this.companylocationChangeHandler}value={this.state.companylocationn}
                type="text" className="form-control" placeholder="Company Location" />
                <br />
                <label>Start Date</label>
                <input style={{width:"300px"}} onChange = {this.startdateChangeHandler}value={this.state.startdate} 
                type="date" className="form-control" placeholder="Start Date" />
                <br/>
                <label>End Date</label>
                <input style={{width:"300px"}} onChange = {this.enddateChangeHandler}value={this.state.enddate} 
                type="date" className="form-control" placeholder="End Date" />
                <br/>
                <label>Job Details</label>
                <input style={{width:"300px"}} onChange = {this.jobdetailsChangeHandler}value={this.state.jobdetails} 
                type="text" className="form-control" placeholder="Job Details" />
                <br/>
                <label>Skills</label>
                <input style={{width:"300px"}} onChange = {this.skillsChangeHandler}value={this.state.skills} 
                type="text" className="form-control" placeholder="Skillset" />
                <br/>
              <button type="button" onClick={this.submitStudentDetails} className="btn btn-success">Save</button>    
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
    studentDetails : state.login.studentDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillStudentDetails : (details) => dispatch(fillStudentDetails(details))
  }
}

// export default EditExperiencedetails;
export default connect(mapStateToProps, mapDispatchToProps)(AddExperienceDetails);
