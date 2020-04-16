import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import {connect} from 'react-redux';
import axios from 'axios';
import JobResultPage from './JobResultPage';
import { fillJobDetailsList} from '../../common_store/actions/job'
import { backendURL } from   "../../Utils/config"


const initialState={
  searchQuery : "",
  locationQuery : "",
  initialJobList : null,
  jobList : [],
  isAscending : true,
  jobType : null,
  sortvalue : true,
  sortorder : ""
}

class StudentJobs extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.listJobResults = this.listJobResults.bind(this);
    this.jobTypeChangeHandler = this.jobTypeChangeHandler.bind(this);
    this.sortValueChangeHandler = this.sortValueChangeHandler.bind(this);
    this.sortOrderChangeHandler = this.sortOrderChangeHandler.bind(this);
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
    this.queryChangeHandler = this.queryChangeHandler.bind(this);
    this.textInputLocation = React.createRef(null);
    this.textInputSearch = React.createRef(null);
  }

  componentWillMount() {
    const data = {
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data " + JSON.stringify(data));
    axios.post(`${backendURL}/jobs/jobsearch`,data)
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
      searchQuery : e.target.value
    })
  }
  locationChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      locationQuery : e.target.value
    })
    // console.log("Searched value is",this.state.searchQuery);
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
    this.props.fillJobDetailsList(filteredJobList);
  }

  sortOrderChangeHandler = (e) => {
    e.preventDefault();
    var isAscending = (e.target.value==="Ascending");

    let sortedJobList = this.state.jobList;
    if (this.state.sortvalue === "createdate") {
      sortedJobList = this.state.jobList.sort((a,b) => {
          var _a = new Date(a.createdate);
          var _b = new Date(b.createdate);
          return (isAscending? (_a.getTime() - _b.getTime()):(_b.getTime() - _a.getTime()));
        });
    }
    else if (this.state.sortvalue === "enddate") {
      sortedJobList = this.state.jobList.sort((a,b) => {
        var _a = new Date(a.enddate);
        var _b = new Date(b.enddate);
        return (isAscending? (_a.getTime() - _b.getTime()):(_b.getTime() - _a.getTime()));
      });
    }
    else if (this.state.sortvalue === "location") {
      if(!isAscending){
        sortedJobList = this.state.jobList.sort((a, b) => b.location.localeCompare(a.location));
      } else {
        sortedJobList = this.state.jobList.sort((a, b) => a.location.localeCompare(b.location));
      }
    }

    this.setState({
      isAscending : isAscending,
      jobList : sortedJobList,
      sortorder : e.target.value
    });
    this.props.fillJobDetailsList(sortedJobList);
  }


  sortValueChangeHandler = (e) => {
    e.preventDefault();
    let sortedJobList = this.state.jobList;
    if (e.target.value === "createdate") {
      sortedJobList = this.state.jobList.sort((a,b) => {
          var _a = new Date(a.createdate);
          var _b = new Date(b.createdate);
          return (this.state.isAscending? (_a.getTime() - _b.getTime()):(_b.getTime() - _a.getTime()));
        });
    }
    else if (e.target.value === "enddate") {
      sortedJobList = this.state.jobList.sort((a,b) => {
        var _a = new Date(a.enddate);
        var _b = new Date(b.enddate);
        return (this.state.isAscending? (_a.getTime() - _b.getTime()):(_b.getTime() - _a.getTime()));
      });
    }
    else if (e.target.value === "location") {
      if(!this.state.isAscending){
        sortedJobList = this.state.jobList.sort((a, b) => b.location.localeCompare(a.location));
      } else {
        sortedJobList = this.state.jobList.sort((a, b) => a.location.localeCompare(b.location));
      }
    }

    this.setState({
      sortvalue : e.target.value,
      jobList : sortedJobList
    });
    this.props.fillJobDetailsList(sortedJobList);
  }

  locationfilter = (e) =>{
    e.preventDefault();
    let locationquery =this.state.locationQuery;

    let filteredJobList=[];
    if (locationquery === "") {
      this.setState({
        jobList : this.state.initialJobList
      });
      return;
    }
    for(let i=0;i < this.state.initialJobList.length;i++){
      if(this.state.initialJobList[i].location.toLowerCase().includes(locationquery.toLowerCase())){
        filteredJobList.push(this.state.initialJobList[i]);
      }
    }
    // console.log("now here",filteredJobList);
    this.setState({
      locationQuery : locationquery,
      jobList : filteredJobList
    });
    this.props.fillJobDetailsList(filteredJobList);
    this.textInputLocation.current.value="";
  }

  listJobResults = (e) => {
    e.preventDefault();
    const data = {
      jobQuery:this.state.searchQuery,
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data " + JSON.stringify(data));
    axios.post(`${backendURL}/jobs/jobsearch`, data)
      .then(response => {
        this.props.fillJobDetailsList(response.data);
        this.setState({
          initialJobList : response.data,
          jobList : response.data
        });
    });
    this.textInputSearch.current.value="";
  }
  
  render() {
    let resultPage = null;
    if (this.state.jobList) {
      resultPage = (<JobResultPage jobDetails = {this.state.jobList} refresh={this.state.sortvalue + this.state.sortorder + this.state.jobType + this.state.locationQuery}></JobResultPage>)
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
                    <div display='flex'>
                    <input onChange = {this.queryChangeHandler} ref={this.textInputSearch}
                      style={{width:'30%'}}type="text" placeholder="Enter Job Title or Company Name to Search"/>&nbsp;
                      <button className="btn btn-success" type='submit'onClick={this.listJobResults}><i className="fa fa-search"></i></button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <input  onChange = {this.locationChangeHandler} ref={this.textInputLocation}
                      style={{width:'30%'}}type="text" placeholder="Enter city name to filter"/>&nbsp;
                      <button className="btn btn-success"type='submit'onClick={this.locationfilter}><i className="fa fa-search"></i></button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
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
                    <select id="sortorder" onChangeCapture = {this.sortOrderChangeHandler} value={this.state.sortorder}>
                      <option> Sort By: </option>
                      <option value="Ascending">Ascending</option>
                      <option value="Descending">Descending</option>
                    </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <select  id="sortvalue" onChangeCapture = {this.sortValueChangeHandler} value={this.state.sortvalue}>
                      <option> Choose Value: </option>
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


function mapDispatchToProps(dispatch) {
  return {
    fillJobDetailsList : (details) => dispatch(fillJobDetailsList(details))
  }
}

// export StudentJob Component
export default connect(null, mapDispatchToProps)(StudentJobs);




