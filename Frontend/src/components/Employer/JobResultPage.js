import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { fillBothDetails } from "../../common_store/actions/login";
import { backendURL } from   "../../Utils/config"
import {Row, Col, Pagination} from 'react-bootstrap';


const initialState={
  listStudentsApplied : null,
  activePage: 1
}

class JobResultPage extends Component {

  constructor(props){
    super(props);
    this.state=initialState;
    // this.searchedJobs = this.searchedJobs.bind(this);
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

  changePage = (e) => {
    let page = this.state.activePage;
    if (e.target.text === ">" && page !== parseInt(e.target.name, 10)) {
        page += 1;
    } else if (e.target.text === "<" && page !== parseInt(e.target.name, 10)) {
        page -= 1;
    } else {
        page = parseInt(e.target.name, 10);
    }
    this.setState({
        activePage: page
    });
  };  

  getStudentDetails = (e) => {
    e.preventDefault();
    const data = {
      jobId : e.target.value,
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data "+ JSON.stringify(data));
    axios.post(`${backendURL}/jobs/studentsapplied`,data)
      .then(response => {
        this.setState({
          listStudentsApplied : response.data,
        });
    });
  }


  // searchedJobs = () => {
  //     if (this.state.listStudentsApplied) {
  //       return <div></div>
  //     }
  //     const jobs = this.props.jobDetails.map((job, index) => {
  //        return ( 
  //               // <div key={job._id}>
              //   <tr>
              //   <th scope="row" className="text-center">{job.title}</th>
              //   <td>{job.createdby}</td>
              //   <td>{job.location}</td>
              //   <td>{job.salary}</td>
              //   <td>{job.type}</td>
              //   <td>{job.createdate}</td>
              //   <td>{job.enddate}</td>
              //   <td><button type="submit" value={job._id} className="btn btn-link" onClick={this.getStudentDetails}>View Details</button></td>
              // </tr>
  //          );
  //    });
  //    return jobs;
  // }

  sectionItems (jobDetails) {
    if (this.state.listStudentsApplied) { return <div/> }

    return (
      <tr>
        <th scope="row" className="text-center">{jobDetails.title}</th>
        {/* <td>{jobDetails.createdby}</td> */}
        <td>{jobDetails.location}</td>
        <td>{jobDetails.salary}</td>
        <td>{jobDetails.type}</td>
        <td>{jobDetails.createdate}</td>
        <td>{jobDetails.enddate}</td>
        <td><button type="submit" value={jobDetails._id} className="btn btn-link" onClick={this.getStudentDetails}>View Details</button></td>
      </tr>
    )
  }

  studentsApplied = () => {
    if (!this.state.listStudentsApplied) {
      return <div></div>
    } 

    const students = this.state.listStudentsApplied.studentsapplied.map((item, index) => {
      return ( 
        <div key={item.username}>
              <div className="radio">
              <label>
              <input type="radio" value={JSON.stringify({job:item, status : 'Pending'})} checked={'pending' === item.status.toLowerCase()}
               onChange={this.updateApplicationStatus} />
                Pending
              </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label>&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="radio" value={JSON.stringify({job:item, status : 'Reviewed'})} checked={'reviewed' === item.status.toLowerCase()}
               onChange={this.updateApplicationStatus}/>
                Reviewed
              </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label>
              <input type="radio" value={JSON.stringify({job:item, status : 'Declined'})} checked={'declined' === item.status.toLowerCase()} 
               onChange={this.updateApplicationStatus}/>
                Declined
              </label>
              <br />
              <br/>
              <h2>{item.username}</h2>
              <button variant="secondary" type="submit" className="btn btn-link"
               value = {item.username}  onClick={this.redirectStudentProfile}>
               Click to view Profile
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
      jobId : this.state.listStudentsApplied._id,
      username : value.job.username,
      status : value.status
    };
    var updatedList = this.state.listStudentsApplied;
    for (var idx = 0; idx < updatedList.studentsapplied.length; ++idx) {
      if (updatedList.studentsapplied[idx].username == data.username){
        updatedList.studentsapplied[idx].status = data.status;
      }
    }
    axios.defaults.withCredentials = true;
    console.log("Sending Data "+ JSON.stringify(data));
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendURL}/jobs/updatejobstatus`,data)
      .then(response => {
        console.log("Result update :", response.data)
        this.setState({
          listStudentsApplied : updatedList
        });
    });
  }

  redirectStudentProfile = (e) => {
    const data ={
      username : e.target.value,
      editmode : false
    };
    console.log("Data being sent is"+JSON.stringify(data));
    axios.post(`${backendURL}/student/signin`,data)
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
    let redirectVar = null,
            section,
            active = 1,
            itemsToShow = 2,
            pagesBar = null,
            renderOutput = [];

    if (this.props.studentDetails) {
      redirectVar = <Redirect to = '/studentprofilepage' />
    }

    if (this.state && this.state.activePage) {
      active = this.state.activePage;
    }

    if (this.props.jobDetails && this.props.jobDetails.length > 0) {
      let sectionCount = 0;
      for (var i = (active - 1) * itemsToShow; i < this.props.jobDetails.length; i++) {
          section = this.sectionItems(this.props.jobDetails[i]);
          renderOutput.push(section);
          if (++sectionCount === itemsToShow)
              break;
      }

      let pages = [];
      let pageCount = Math.ceil(this.props.jobDetails.length / itemsToShow);

      for (let i = 1; i <= pageCount; i++) {
          pages.push(
              <Pagination.Item active={i === active} name={i} key={i} onClick={this.changePage}>
                  {i}
              </Pagination.Item>
          );
      }
      pagesBar = (
          <div>
              <br />
              <Pagination>
                  <Pagination.Prev name="1" onClick={this.changePage} />
                  {pages}
                  <Pagination.Next name={pageCount} onClick={this.changePage} />
              </Pagination>
          </div>
      );
    }

    return(
      <React.Fragment>
        {redirectVar}
        <br />{!this.state.listStudentsApplied?<div>
        <div><h2 style={{align:'center'}}>Job List :</h2></div>
        <br />
        <table className="table table-borderless table-hover">
         <thead className="thead-dark">
          <tr>
            <th className="text-center">Job Title</th>
           {/* <th className="text-center">Company Name</th> */}
           <th className="text-center">Location</th>
            <th className="text-center">Salary</th>
            <th className="text-center">Job Type</th>
            <th className="text-center">Create Date</th>
            <th className="text-center">End Date</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {renderOutput}
          </tbody>
        </table></div>:<div></div>}
        { !this.state.listStudentsApplied ?
          (<Row>
                <Col sm={4}></Col>
                <Col>{pagesBar}</Col>
          </Row>) :  <div/>}
        <div className="row-container">{this.studentsApplied()}</div>
      </React.Fragment> 
    )
  }    
}

function mapStateToProps(state) {
  return {
    employerDetails : state.login.employerDetails,
    studentDetails : state.login.studentDetails
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fillBothDetails : (details) => dispatch(fillBothDetails(details))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(JobResultPage);
