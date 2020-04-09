import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import axios from 'axios';
import JobResultPage from './JobResultPage';

const initialState={
 // jobListsFetched : false,
  jobQuery : null,
  jobList : null,
  jobType : null,
  filteredJobList : null
}

class StudentJobs extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.listJobResults = this.listJobResults.bind(this);
  }

  componentWillMount() {
    const data = {
    };
    axios.defaults.withCredentials = true;
    console.log("Sending Data "+JSON.stringify(data));
    axios.post('http://localhost:3001/jobs/jobsearch',data)
      .then(response => {
        console.log("Result jobs :", response.data)
        this.setState({
          jobList : response.data
        })
    });

  }

  queryChangeHandler = (e) => {
    this.setState({
      jobQuery : e.target.value
    })
  }

  jobTypeChangeHandler = (e) => {
    let filteredJobList=[];
    if (e.target.value === "") {
      this.setState({
        filteredJobList : null
      })
      return;
    }
    for(let i=0;i<this.state.jobList.length;i++){
      if(this.state.jobList[i].type.toLowerCase() === e.target.value.toLowerCase()){
        filteredJobList.push(this.state.jobList[i]);
      }
    }
    console.log(filteredJobList);
    this.setState({
      jobType : e.target.value,
      filteredJobList : filteredJobList,
    });
  }

  listJobResults = (e) => {
    e.preventDefault();
    const data = {
      jobQuery:this.state.jobQuery,
    };
    axios.defaults.withCredentials = true;
    console.log("Sending Data "+JSON.stringify(data));
    axios.post('http://localhost:3001/jobs/jobsearch',data)
      .then(response => {
        console.log("Result jobs :", response.data)
        this.setState({
          //jobListsFetched : true,
          jobList : response.data
        })
    })
  }
  
  render() {
    let resultPage = null;
    
    if (this.state.filteredJobList) {
      resultPage = (<JobResultPage jobDetails = {this.state.filteredJobList}></JobResultPage>)
    } else if (this.state.jobList) {
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
                    <button type='submit'onClick={this.listJobResults}><i className="fa fa-search"></i></button>
                    <br />
                    <br />
                    <i className="glyphicon glyphicon-filter" /><label>Job Type:&nbsp;&nbsp;</label>
                    <select id="types" onChangeCapture = {this.jobTypeChangeHandler} value={this.state.jobType}>
                      <option value="">All</option>
                      <option value="fulltime">Full Time</option>
                      <option value="parttime">Part Time</option>
                      <option value="oncampus">On Campus</option>
                      <option value="internship">Internship</option>
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




