import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import { fillStudentDetails } from "../../common_store/actions/index";

const initialState={
  detailsSubmitted : false,
  studentDetails : null
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
    var newstudentDetails = this.state.studentDetails;
    newstudentDetails.studentExperience[this.props.location.state].companyname = e.target.value;
    this.setState({studentDetails : newstudentDetails});
  }

  titleChangeHandler = (e) => {
    var newstudentDetails = this.state.studentDetails;
    newstudentDetails.studentExperience[this.props.location.state].title = e.target.value;
    this.setState({studentDetails : newstudentDetails});
  }

  companylocationChangeHandler = (e) => {
    var newstudentDetails = this.state.studentDetails;
    newstudentDetails.studentExperience[this.props.location.state].companylocation = e.target.value;
    this.setState({studentDetails : newstudentDetails});
  }

  startdateChangeHandler = (e) => {
    var newstudentDetails = this.state.studentDetails;
    newstudentDetails.studentExperience[this.props.location.state].startdate = e.target.value;
    this.setState({studentDetails: newstudentDetails})
  }

  enddateChangeHandler = (e) => {
    var newstudentDetails = this.state.studentDetails;
    newstudentDetails.studentExperience[this.props.location.state].enddate = e.target.value;
    this.setState({studentDetails: newstudentDetails})
  }

  jobdetailsChangeHandler = (e) => {
    var newstudentDetails = this.state.studentDetails;
    newstudentDetails.studentExperience[this.props.location.state].jobdetails = e.target.value;
    this.setState({studentDetails: newstudentDetails})
  }

  skillsChangeHandler = (e) => {
    var newstudentDetails = this.state.studentDetails;
    newstudentDetails.studentExperience[this.props.location.state].skills = e.target.value;
    this.setState({studentDetails: newstudentDetails})
  }

  dispatch = async (state) => {
    await this.props.fillStudentDetails(state)
    return this.props.studentDetails;
  }


  submitStudentDetails = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {details : this.state.studentDetails,
                  edit_experience_details : true}
    console.log("Sending Data ", data,  axios.defaults.headers);
    axios.post('http://localhost:3001/editstudentdetails', data)
      .then(response => {
        console.log("Edit Experience Response: ", response);
        if (response.status === 200) {
          this.dispatch(this.state.studentDetails)
            .then(result => {
              this.setState({
                detailsSubmitted : true
              })
             console.log("Edited details: ", result.data.details);
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
      <div className="col-md-offset-0">
           <div className="profile-content">
              <div className="col-md-offset-4">
                <h2>Edit Experience</h2>
                <label>Company Name</label>
                <input style={{width:"300px"}} onChange = {this.companynameChangeHandler}value={this.state.companyname} placeholder={this.props.studentDetails.studentExperience[this.props.location.state].companyname}
                type="text" className="form-control" name="companyname" />
                <br />
                <label>Title</label>
                <input style={{width:"300px"}} onChange = {this.titleChangeHandler}value={this.state.title} placeholder={this.props.studentDetails.studentExperience[this.props.location.state].title}
                type="text" className="form-control" name="dob" />
                <br />
                <label>Company Location</label>
                <input style={{width:"300px"}} onChange = {this.companylocationChangeHandler}value={this.state.companylocationn} placeholder={this.props.studentDetails.studentExperience[this.props.location.state].companylocation}
                type="text" className="form-control" name="city" />
                <br />
                <label>Start Date</label>
                <input style={{width:"300px"}} onChange = {this.startdateChangeHandler}value={this.state.startdate} placeholder={this.props.studentDetails.studentExperience[this.props.location.state].startdate}
                type="text" className="form-control" name="state" />
                <br/>
                <label>End Date</label>
                <input style={{width:"300px"}} onChange = {this.enddateChangeHandler}value={this.state.enddate} placeholder={this.props.studentDetails.studentExperience[this.props.location.state].enddate}
                type="text" className="form-control" name="country" />
                <br/>
                <label>Job Details</label>
                <input style={{width:"300px"}} onChange = {this.jobdetailsChangeHandler}value={this.state.jobdetails} placeholder={this.props.studentDetails.studentExperience[this.props.location.state].jobdetails}
                type="text" className="form-control" name="objective" />
                <br/>
                <label>Skills</label>
                <input style={{width:"300px"}} onChange = {this.skillsChangeHandler}value={this.state.skills} placeholder={this.props.studentDetails.studentDetails.skills}
                type="text" className="form-control" name="objective" />
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
