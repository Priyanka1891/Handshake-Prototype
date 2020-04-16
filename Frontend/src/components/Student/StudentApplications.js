import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import axios from 'axios';
import {connect} from 'react-redux';
import JobApplicationResultPage from './JobApplicationResultPage';
import { backendURL } from   "../../Utils/config"



const initialState={
  appliedjobList : null,
  filteredJobList : null
}

class StudentApplications extends Component {
  constructor(props){
    super(props);
    this.state=initialState;
    this.statusChangeHandler = this.statusChangeHandler.bind(this);
  }

  componentWillMount = () => {  
    const data = {username : this.props.studentDetails.username};
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendURL}/jobs/jobsappliedstudent`,data)
      .then(response => {
        console.log("here",response.data);
        this.setState({
          appliedjobList : response.data
        })
    });
  }

  statusChangeHandler = (e) => {
    let filteredJobList=[];
    if (e.target.value === "") {
      this.setState({
        filteredJobList : this.state.appliedjobList
      })
      return;
    }
    if(!this.state.appliedjobList) {
      return;
    }
    for(let i=0; i < this.state.appliedjobList.length; i++){
      var studentsapplied = this.state.appliedjobList[i].studentsapplied;
      for(let j=0; j < studentsapplied.length; j++) {
        if((studentsapplied[j].username === this.props.studentDetails.username)
            && (studentsapplied[j].status.toLowerCase() === e.target.value.toLowerCase())) {
          filteredJobList.push(this.state.appliedjobList[i]);
        }
      }
    }
    this.setState({
      filteredJobList : filteredJobList,
    });
  }



  render() {
    let resultPage = null;
    // console.log("ok here", this.state, this.state.appliedjobList);

    if (this.state.filteredJobList) {
      resultPage = (<JobApplicationResultPage studentList = {this.state.filteredJobList}></JobApplicationResultPage>);
    } else if (this.state.appliedjobList) {
      console.log("ok here", this.state);
      resultPage = (<JobApplicationResultPage studentList = {this.state.appliedjobList}></JobApplicationResultPage>);
    }  
      return(
        <React.Fragment>
        <StudentNavbar />
        <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="http://code.jquery.com/jquery-1.11.1.min.js" />
        <link rel="stylesheet" href="style.css"  />
        <div className="container">
          <div className="login-form">
            <div className="panel">
              <div>
                <label>Jobs Applied :</label>
                <br />
                <br />
                <i className="glyphicon glyphicon-filter" /><label>Status:&nbsp;&nbsp;</label>
                  <select id="types" onChangeCapture = {this.statusChangeHandler} value={this.state.status}>
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Declined">Declined</option>
                  </select>
                <br />
                <br />
                {resultPage}
              </div>
            </div>
          </div>
        </div> 
        </React.Fragment>
      )
  }
}

function mapStateToProps(state) {
  return {
    studentDetails : state.login.studentDetails
  }
}
export default connect(mapStateToProps, null)(StudentApplications);
