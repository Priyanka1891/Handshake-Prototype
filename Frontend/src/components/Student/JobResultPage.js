import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

const initialState={
  jobId : null,
  username : null,
}
class JobResultPage extends Component {

  constructor(props){
    super(props);
    this.state=initialState;
    this.applyJobs = this.applyJobs.bind(this);
    this.searchedJobs = this.searchedJobs.bind(this);
  }


  applyJobs = (e) => {
    e.preventDefault();
    const data = {
      jobId : e.target.value,
      username : this.props.studentDetails.username
    };

    axios.defaults.withCredentials = true;
    console.log("Sending Data "+ JSON.stringify(data));
    axios.post('http://localhost:3001/jobs/jobsapplied',data)
      .then(response => {
        console.log("Entered inside axios post req");
        if(response.data){
          window.alert("Job applied successfully");
        }
    });
  }

  searchedJobs(){
      console.log("JOB DETAIL list:", this.props.jobDetails);
      const jobs = this.props.jobDetails.map((job, index) => {
         return ( 
                  <div key={job.jobId}>
                  <div><h2>{job.jobTitle}</h2>
                  {job.companyname},
                  &nbsp;{job.jobLocation},
                  &nbsp;{job.salary},
                  &nbsp;{job.jobDescription},
                  &nbsp;{job.jobCategory},
                  &nbsp;{job.createdate}&nbsp;-&nbsp;{job.enddate}
                  &nbsp;<button type="submit" value={job.jobId} onClick={this.applyJobs}>Apply
                  </button></div>
                  <br />
                  </div> 
                );
      });
     return jobs;
  }

  render() {
    return(
      <React.Fragment>
        <div className="container" />
        <div className="login-form" />
        <div className="panel" />
        <div><h2 style={{align:'center'}}>Jobs matching your search criteria</h2></div>
        <br />
        <div className="row-container">{this.searchedJobs()}</div>
      </React.Fragment> 
    )
  }    
}

function mapStateToProps(state) {
  return {
    studentDetails : state.studentDetails
  }
}
export default connect(mapStateToProps, null)(JobResultPage);
