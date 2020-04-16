import React, {Component} from 'react';
import EmployerNavbar from './EmployerNavbar';
import axios from 'axios';
import {connect} from 'react-redux';
import SearchedStudentResultPage from './SearchedStudentResultPage';
import { fillBothDetails } from "../../common_store/actions/login";
import { backendURL } from   "../../Utils/config"



const initialState={
  studentQuery : null,
  studentList : null,
}

class EmployerSearchStudent extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.listStudentResults = this.listStudentResults.bind(this);
  }

  queryChangeHandler = (e) => {
    this.setState({
      studentQuery : e.target.value
    })
  }

  listStudentResults = (e) => {
    e.preventDefault();
    var payload = {studentDetails : null , employerDetails : this.props.employerDetails};
    this.props.fillBothDetails(payload);
    const data = {
      studentQuery : this.state.studentQuery,
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data "+JSON.stringify(data));
    axios.post(`${backendURL}/jobs/studentsearch`, data)
      .then(response => {
        console.log("Result students :", response.data)
        this.setState({
          studentList : response.data
        })
    })
  }


  render() {
    let resultPage = null;
    resultPage = this.state.studentList ? (<SearchedStudentResultPage studentList = {this.state.studentList}></SearchedStudentResultPage>) : null;

    return(
      <React.Fragment>
        <EmployerNavbar />
        <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="http://code.jquery.com/jquery-1.11.1.min.js" />
        <link rel="stylesheet" href="style.css"  />
        <div className="container">
          <div className="login-form">
            <div className="panel">
              <div>
                <label>Student Search:</label>
                <br />
                <input onChange = {this.queryChangeHandler} 
                    type ='text' style={{width:'70%'}}type="text" placeholder="Enter Student Name or College Name or Skill to Search"/>
                <button type='submit'onClick={this.listStudentResults}><i className="fa fa-search"></i></button>
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
    employerDetails : state.login.employerDetails,
    studentDetails : state.login.studentDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillBothDetails : (details) => dispatch(fillBothDetails(details))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerSearchStudent);
