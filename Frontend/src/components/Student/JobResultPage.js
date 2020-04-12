import React, {Component} from 'react';
// import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';


const initialState={
  jobId : null,
  username : null,
  viewJob : false
}
class JobResultPage extends Component {

  constructor(props){
    super(props);
    this.state=initialState;
    this.applyJobs = this.applyJobs.bind(this);
    this.searchedJobs = this.searchedJobs.bind(this);
  }

  applyJobs = (e) => {
    this.setState({
      viewJob : true
    })

    }
    // e.preventDefault();
    // const data = {
    //   jobId : e.target.value,
    //   username : this.props.studentDetails.username
    // };

    // axios.defaults.withCredentials = true;
    // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    // console.log("Sending Data "+ JSON.stringify(data));
    // axios.post('http://localhost:3001/jobs/jobsapplied',data)
    //   .then(response => {
    //     console.log("Entered inside axios post req");
    //     if(response.data){
    //       window.alert("Job applied successfully");
    //     }
    // });
  // }


  searchedJobs = () => {

    let redirectVar = null;
      const jobs = this.props.jobDetails.map((job, index) => {
        if (this.state.viewJob) {
          redirectVar = <Redirect to={{pathname :'/viewjobdetails',state:this.props.jobDetails}}/>
        }    
         return ( 
            <React.Fragment>
              {/* <div key={job._id}> */}
                  <tr>
                    <th scope="row" className="text-center">{job.title}</th>
                    <td>{job.createdby}</td>
                    <td>{job.location}</td>
                    <td>{job.salary}</td>
                    {/* <td>{job.description}</td> */}
                    <td>{job.type}</td>
                    <td>{job.createdate}</td>
                    <td>{job.enddate}</td>
                    <td><button type="submit" value={job._id} onClick={this.applyJobs}>View</button></td>
                    {/* <td><button type="submit" value={job._id} onClick={this.showModal()}>View</button></td> */}
                  </tr>
              {/* </div> */}
            </React.Fragment>
                );
      });
     return jobs;
  }

  render() {
    return(
      <React.Fragment>
        <div><h2 style={{align:'center'}}>Jobs matching your search criteria</h2></div>
        <br />
        <table className="table table-borderless table-hover">
         <thead className="thead-dark">
          <tr>
            <th className="text-center">Job Title</th>
            <th className="text-center">Company Name</th>
            <th className="text-center">Location</th>
            <th className="text-center">Salary</th>
            <th className="text-center">Job Type</th>
            <th className="text-center">Create Date</th>
            <th className="text-center">End Date</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
            {this.searchedJobs()}
          </tbody>
        </table>
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
