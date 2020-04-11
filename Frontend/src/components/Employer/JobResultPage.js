import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { fillBothDetails } from "../../common_store/actions/index";

const initialState={
  listStudentsApplied : null,
}

class JobResultPage extends Component {

  constructor(props){
    super(props);
    this.state=initialState;
    this.searchedJobs = this.searchedJobs.bind(this);
    this.getStudentDetails = this.getStudentDetails.bind(this);
    this.studentsApplied = this.studentsApplied.bind(this);
    this.redirectStudentProfile = this.redirectStudentProfile.bind(this);
    this.updateApplicationStatus  = this.updateApplicationStatus.bind(this);
  }

  componentWillMount() {
    this.setState(initialState);
  }

  componentWillReceiveProps() {
    this.setState(initialState);
  }

  getStudentDetails = (e) => {
    e.preventDefault();
    const data = {
      jobId : e.target.value,
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data "+ JSON.stringify(data));
    axios.post('http://localhost:3001/jobs/studentsapplied',data)
      .then(response => {
        console.log("Result student search :", response.data)
        this.setState({
          listStudentsApplied : response.data,
        });
    });
  }


  searchedJobs = () => {
      if (this.state.listStudentsApplied) {
        return <div></div>
      }
      const jobs = this.props.jobDetails.map((job, index) => {
         return ( 
                <div key={job._id}>
                <div><h2>{job.title}</h2></div>
                <p>{job.createdby},
                &nbsp;{job.location},
                &nbsp;{job.createdate}&nbsp;-&nbsp;{job.enddate}
                &nbsp;<button type="submit" 
                value={job._id} onClick={this.getStudentDetails}>
                Details
                </button></p>
                </div>
           );
     });
     return jobs;
  }

  studentsApplied = () => {
    if (!this.state.listStudentsApplied) {
      return <div></div>
    } 

    const students = this.state.listStudentsApplied.map((item, index) => {
      return ( 
        <div key={item.username}>
              <div className="radio">
              <label>
              <input type="radio" value={JSON.stringify({job:item, status : 'pending'})} checked={'pending' === item.status.toLowerCase()}
               onChange={this.updateApplicationStatus} />
                Pending
              </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label>&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="radio" value={JSON.stringify({job:item, status : 'reviewed'})} checked={'reviewed' === item.status.toLowerCase()}
               onChange={this.updateApplicationStatus}/>
                Reviewed
              </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label>
              <input type="radio" value={JSON.stringify({job:item, status : 'declined'})} checked={'declined' === item.status.toLowerCase()} 
               onChange={this.updateApplicationStatus}/>
                Declined
              </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button variant="secondary" type="submit" 
               value = {item.username} style={{width:'100px'}} onClick={this.redirectStudentProfile}><i className='glyphicon glyphicon-user'/>
               &nbsp;{item.username}'s Profile
              </button>
            </div>
            </div>

      );
    });
    return students;
  }

  updateApplicationStatus = (e) => {
    e.preventDefault();
    let value = JSON.parse(e.target.value);
    const data = {
      jobId : value.job.jobid,
      username : value.job.username,
      status : value.status
    };
    axios.defaults.withCredentials = true;
    console.log("Sending Data "+ JSON.stringify(data));
    axios.post('http://localhost:3001/jobs/studentsapplied',data)
      .then(response => {
        console.log("Result update :", response.data)
        this.setState({
          listStudentsApplied : response.data[1],
        });
    });
  }

  redirectStudentProfile = (e) => {
    const data ={
      username : e.target.value,
      editmode : false
    };
    console.log("Data being sent is"+JSON.stringify(data));
    axios.post('http://localhost:3001/studentsignin',data)
      .then(response=>{
        console.log("Entered inside axios post req", response);
        if(response.data.details){
          const newStudentDetails={...response.data.details,
              editmode : false
          }
          const bothDetails = {studentDetails : newStudentDetails, employerDetails : this.props.employerDetails};
          this.props.fillBothDetails(bothDetails);
        }
      })
  }

  render() {
    let redirectVar = null;
    if (this.props.studentDetails) {
      redirectVar = <Redirect to = '/studentprofilepage' />
    }
    return(
      <React.Fragment>
        {redirectVar}
        <div className="container" />
        <div className="login-form" />
        <div className="panel" />
        <div className="row-container">{this.searchedJobs()}</div>
        <div className="row-container">{this.studentsApplied()}</div>
      </React.Fragment> 
    )
  }    
}

function mapStateToProps(state) {
  return {
    employerDetails : state.employerDetails,
    studentDetails : state.studentDetails
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fillBothDetails : (details) => dispatch(fillBothDetails(details))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(JobResultPage);
