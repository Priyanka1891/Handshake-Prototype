import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import axios from 'axios';
import SearchedStudentResultPage from './SearchedStudentResultPage';
import { backendURL } from   "../../Utils/config"



const initialState={
  studentQuery : null,
  studentList : null,
  filteredStudentList : null,
}

class StudentList extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.listStudentResults = this.listStudentResults.bind(this);
    this.queryChangeHandler = this.queryChangeHandler.bind(this);
    this.majorChangeHandler = this.majorChangeHandler.bind(this);
  }

  queryChangeHandler = (e) => {
    this.setState({
      studentQuery : e.target.value
    })
  }
  // componentWillMount=()=>{
  //   axios.defaults.withCredentials = true;
  //   axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  //   axios.post(`${backendURL}/jobs/studentsearch`, {})
  //   .then(response => {
  //     this.setState({
  //       studentList : response.data
  //     })
  // })

  // }

  majorChangeHandler = (e) => {
    let filteredStudentList=[];
    if (e.target.value === "") {
      this.setState({
        filteredStudentList : null
      })
      return;
    }
    for(let i=0;i<this.state.studentList.length;i++){
        for(let j=0;j<this.state.studentList[i].studentEducation.length;j++)
          if(this.state.studentList[i].studentEducation[j].major.toLowerCase() === e.target.value.toLowerCase()){
              filteredStudentList.push(this.state.studentList[i]);
      }
    }
    console.log("Filtered student list is : ",filteredStudentList);
    this.setState({
      major : e.target.value,//?
      filteredStudentList : filteredStudentList,
    });
  }


  listStudentResults = (e) => {
    e.preventDefault();
    const data = {
      studentQuery : this.state.studentQuery,
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data "+JSON.stringify(data));
    axios.post(`${backendURL}/jobs/studentsearch`,data)
      .then(response => {
        console.log("Result students :", response.data)
        this.setState({
          studentList : response.data
        })
    })
  }


  render() {
    let resultPage = null;
    if (this.state.filteredStudentList) {
      resultPage = (<SearchedStudentResultPage studentList = {this.state.filteredStudentList}></SearchedStudentResultPage>);
    } else if (this.state.studentList) {
      resultPage = (<SearchedStudentResultPage studentList = {this.state.studentList}></SearchedStudentResultPage>);
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
                <label>Student Search:</label>
                <br />
                <input onChange = {this.queryChangeHandler} 
                    type ='text' style={{width:'70%'}}type="text" placeholder="Enter Student Name or College Name to Search"/>&nbsp;&nbsp;
                <button type='submit'onClick={this.listStudentResults}><i className="fa fa-search"></i></button>
                <br />
                <br />
                <i className="glyphicon glyphicon-filter" /><label>Major:&nbsp;&nbsp;</label>
                  <select id="types" onChangeCapture = {this.majorChangeHandler} value={this.state.major}>
                    <option value="">All</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Data Analytics">Data Analytics</option>
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


export default StudentList;
