import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import axios from 'axios';
import JobResultPage from './JobResultPage';

const initialState={
  jobQuery : null,
  initialJobList : null,
  jobList : null,
  jobType : null,
  sortedBy : null,
}

class StudentJobs extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.listJobResults = this.listJobResults.bind(this);
    this.jobTypeChangeHandler = this.jobTypeChangeHandler.bind(this);
    this.sortChangeHandler = this.sortChangeHandler.bind(this);
  }

  componentWillMount() {
    const data = {
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data " + JSON.stringify(data));
    axios.post('http://localhost:3001/jobs/jobsearch',data)
      .then(response => {
        this.setState({
          initialJobList : response.data,
          jobList : response.data
        })
    });
  }

  queryChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      jobQuery : e.target.value
    })
  }

  jobTypeChangeHandler = (e) => {
    e.preventDefault();
    let filteredJobList=[];
    if (e.target.value === "") {
      this.setState({
        jobType : "All",
        jobList : this.state.initialJobList
      });
      return;
    }
    for(let i=0;i < this.state.initialJobList.length;i++){
      if(this.state.initialJobList[i].type.toLowerCase() === e.target.value.toLowerCase()){
        filteredJobList.push(this.state.initialJobList[i]);
      }
    }
    this.setState({
      jobType : e.target.value,
      jobList : filteredJobList
    });
  }

  sortChangeHandler = (e) => {
    e.preventDefault();
    let sortedJobList = this.state.jobList;
    if (e.target.value === "createdate") {
      sortedJobList = this.state.jobList.sort((a,b) => {
          var _a = new Date(a.createdate);
          var _b = new Date(b.createdate);
          return _a.getTime() - _b.getTime();
        });
    }
    else if (e.target.value === "enddate") {
      sortedJobList = this.state.jobList.sort((a,b) => {
        var _a = new Date(a.enddate);
        var _b = new Date(b.enddate);
        return _a.getTime() - _b.getTime();
      });
    }
    else if (e.target.value === "location") {
      sortedJobList = this.state.jobList.sort((a, b) => a.location.localeCompare(b.location))
    }

    this.setState({
      sortedBy : e.target.value,
      jobList : sortedJobList
    });
  }

  listJobResults = (e) => {
    e.preventDefault();
    const data = {
      jobQuery:this.state.jobQuery,
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data " + JSON.stringify(data));
    axios.post('http://localhost:3001/jobs/jobsearch', data)
      .then(response => {
        this.setState({
          initialJobList : response.data,
          jobList : response.data
        });
    });
  }
  
  render() {
    let resultPage = null;
    if (this.state.jobList) {
      console.log("reached here ", this.state.jobList);
      resultPage = (<JobResultPage jobDetails = {this.state.jobList}></JobResultPage>)
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
                    <label>Job Search:</label>
                    <br />
                    <input onChange = {this.queryChangeHandler} 
                    type ='text' style={{width:'70%'}}type="text" placeholder="Enter Job Title or Company Name to Search"/>
                    &nbsp;&nbsp;<button type='submit'onClick={this.listJobResults}><i className="fa fa-search"></i></button>
                    <br />
                    <br />
                    <i className="glyphicon glyphicon-filter" /><label>Job Type:&nbsp;&nbsp;</label>
                    <select id="types" onChangeCapture = {this.jobTypeChangeHandler} value={this.state.jobType}>
                      <option value="">All</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="On Campus">On Campus</option>
                      <option value="Internship">Internship</option>
                    </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <select id="relevance" onChangeCapture = {this.sortChangeHandler} value={this.state.sortedBy}>
                      <option>Sort By:</option>
                      <option value="location">Location</option>
                      <option value="createdate">Posting Date</option>
                      <option value="enddate">Deadline</option>
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

export default StudentJobs;




