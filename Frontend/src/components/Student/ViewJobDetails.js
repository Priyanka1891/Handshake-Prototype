import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import Resume from './Resume';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { backendURL } from   "../../Utils/config"
import { fillBothDetails } from "../../common_store/actions/login";


const initialState={
  uploadresume : false,
  enableapply : false,
  canceljob : false,
  renderEmployer : false
}

class ViewJobDetails extends Component {
  constructor(props){
    super(props);
    this.state=initialState;
    this.uploadResume = this.uploadResume.bind(this);
    this.applyJob = this.applyJob.bind(this);
    this.cancelJob = this.cancelJob.bind(this);
    this.enableApply = this.enableApply.bind(this);
  }
  uploadResume = (e) => {
    e.preventDefault();
    this.setState({
      uploadresume : true
    }) 
  }

  applyJob = (e) =>{
    e.preventDefault();
    const data = {
      jobId : this.props.location.state._id,
      username : this.props.studentDetails.username,
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data "+ JSON.stringify(data));
    axios.post(`${backendURL}/jobs/jobsapplied`,data)
      .then(response => {
        console.log("Entered inside axios post req");
        if(response.data){
          window.alert(response.data);
        }
    });
  }
  redirectEmployerProfile = (e) => {
    const data ={
      username : this.props.location.state.username,
      editmode : false
    };
    console.log("Data being sent is"+JSON.stringify(data));
    axios.post(`${backendURL}/employer/signin`,data)
      .then(response=>{
        console.log("Entered inside axios post req", response);
        if(response.data.details){
          const newEmployerDetails={...response.data.details,
              editmode : false
          }
          const bothDetails = {studentDetails : this.props.studentDetails, employerDetails : newEmployerDetails};
          this.props.fillBothDetails(bothDetails);
          this.setState({
            renderEmployer : true
          })
        }
      })
  }
  enableApply = ()=> {
    this.setState({
      enableapply : true
    })
  }
  cancelJob=()=>{
    this.setState({
      canceljob : true
    })
  }

  render() {
    let redirectVar = null;
    if (this.state.canceljob) {
      redirectVar = <Redirect to='/studentjobs' />
    }   
    else if(this.props.employerDetails && this.state.renderEmployer) {
      redirectVar = <Redirect to={{pathname: "/employerprofilepage", state: {isStudent: true}}} />
    }

      return(
        <React.Fragment>
          {redirectVar}
        <StudentNavbar/>
        <div className="container">
          <h2>{this.props.location.state.title}</h2>
          <br />
          <div className="card">
           <div className="card-body">
            <label for="usr">Create Date :&nbsp;&nbsp;&nbsp;{this.props.location.state.createdate}</label>
            <label for="usr">End Date :&nbsp;&nbsp;&nbsp;{this.props.location.state.enddate}</label>
            <label for="usr">Location :&nbsp;&nbsp;&nbsp;{this.props.location.state.location}</label>
            <label for="usr">Salary :&nbsp;&nbsp;&nbsp;{this.props.location.state.salary}</label>
            <label for="usr">Job Type :&nbsp;&nbsp;&nbsp;{this.props.location.state.type}</label>
            <label for="usr">Company Name :&nbsp;&nbsp;&nbsp;{this.props.location.state.createdby}</label>
            <br/>
            <button type="button"onClick={this.redirectEmployerProfile}className="btn btn-link">Click to view {this.props.location.state.createdby} profile</button>
            <br/>
            <br/>
            {this.state.enableapply ?
              <button type="button" onClick={this.applyJob}className="btn btn-success">Apply</button>
              :
              <button type="button" className="btn btn-success" disabled>Submit</button>
            }
            <button type="button"onClick={this.cancelJob}className="btn btn-danger">Cancel</button>  
            <button type="button" onClick={this.uploadResume}className="btn btn-warning">Upload Resume</button>      
           </div>
          </div>
          <br/>
          <br/>
          {this.state.uploadresume ?
         <Resume enableapply = {this.enableApply}/> : <div/>}
        </div>
        </React.Fragment>
      )
  }
}


function mapStateToProps(state) {
  return {
    studentDetails : state.login.studentDetails,
    employerDetails : state.login.employerDetails
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fillBothDetails : (details) => dispatch(fillBothDetails(details))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewJobDetails);


