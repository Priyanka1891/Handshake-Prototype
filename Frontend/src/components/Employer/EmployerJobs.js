import React, {Component} from 'react';
import EmployerNavbar from './EmployerNavbar';
import axios from 'axios';
import {connect} from 'react-redux';
import JobResultPage from './JobResultPage';
import {Redirect} from 'react-router';
import { fillBothDetails } from "../../common_store/actions/login";
import { fillJobDetailsList } from '../../common_store/actions/job'
import { backendURL } from   "../../Utils/config"




const initialState={
  postNewJob : false,
  jobQuery : null,
  jobsList : null,
}

class EmployerJobs extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.listJobResults = this.listJobResults.bind(this);
    this.postJob = this.postJob.bind(this);
  }


  listJobResults = (e) => {
    e.preventDefault();
    var payload = {studentDetails : null , employerDetails : this.props.employerDetails};
    this.props.fillBothDetails(payload);
    const data = {
      jobQuery : this.props.employerDetails.name,
    };
    if (!this.props.employerDetails.name) {
      window.alert('Please login and try again..');
      return;
    }
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data for job search"+ JSON.stringify(data));
    axios.post(`${backendURL}/jobs/jobsearch`,data)
      .then(response => {
        console.log("Result job search :", response.data)
        this.props.fillJobDetailsList(response.data);
        this.setState({
          jobsList : response.data
        });
    });
  }
  
  postJob = (e) => {
    e.preventDefault();
    var payload = {studentDetails : null , employerDetails : this.props.employerDetails};
    this.props.fillBothDetails(payload);
    this.setState({
      postNewJob : true
    })
  }

  render() {
    let resultPage = null;
    resultPage = this.state.jobsList ? (<JobResultPage jobDetails = {this.state.jobsList}></JobResultPage>) : null;

    let redirectVar = null;
    if (this.state.postNewJob) {
      redirectVar = <Redirect to = "/postjob" />
    }

    return(
      <React.Fragment>
        {redirectVar}
        <EmployerNavbar />
        <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="http://code.jquery.com/jquery-1.11.1.min.js" />
        <link rel="stylesheet" href="style.css"  />
        <div className="container">
          <div className="login-form">
              <div className="panel">
                  <br />
                  <button className="btn btn-success" type='submit'onClick={this.postJob}>Post Job</button>
                  <br />
                  <br />
                  <button className="btn btn-success" type='submit'onClick={this.listJobResults}>List Jobs</button>
                  <br />
                {resultPage}
              </div>
          </div>
        </div> 
      </React.Fragment> 
    )
  }
}


function mapStateToProps(state) {
  return {
    employerDetails : state.login.employerDetails
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fillBothDetails : (details) => dispatch(fillBothDetails(details)),
    fillJobDetailsList : (details) => dispatch(fillJobDetailsList(details))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmployerJobs);


