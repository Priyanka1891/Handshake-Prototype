import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { fillStudentDetails}  from "../../common_store/actions/login";
import {fillStudentBasicDetails, fillStudentEducationDetails, fillStudentExperienceDetails,
        fillStudentImageDetails, fillStudentResumeDetails} from "../../common_store/actions/student"
import axios from 'axios';
import { backendURL } from   "../../Utils/config"

const jwt_decode = require('jwt-decode');


const initialState={
  username : "",
  password : "",
  token: ""
}

class StudentSignIn extends Component{

  constructor(props){
    super(props);
    this.state=initialState;
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.login = this.login.bind(this);
  }


usernameChangeHandler = (e) => {
  this.setState({
    username : e.target.value,
  })
}

passwordChangeHandler = (e) => {
  this.setState({
    password : e.target.value,
  })
}

dispatch = async (state) => {
  await this.props.fillStudentDetails(state)  
  return this.props.studentDetails;
}

login = (e) => {
  e.preventDefault();
  const data = {
    username : this.state.username,
    password : this.state.password,
    editmode : true
  }
  axios.defaults.withCredentials = true;
  console.log("Sending Data "+ JSON.stringify(data));
  axios.post(`${backendURL}/student/signin`,data)
    .then(response => {
      const newStudentDetails={...response.data.details,
        editmode : true};
      this.dispatch(newStudentDetails)
        .then(result => {
          console.log("Student details: ", result);
          this.setState({
            token: response.data.value
          });
          this.props.fillStudentBasicDetails(result.basicDetails);
          this.props.fillStudentEducationDetails(result.studentEducation);
          this.props.fillStudentExperienceDetails(result.studentExperience);
          this.props.fillStudentImageDetails(result.image);
          this.props.fillStudentResumeDetails(result.resume);
      });
      console.log("Response data is ",response.data.details);
    })
    .catch(error => {
      console.log(error);
    });
} 

render() {     
  let redirectVar = null;
  if (this.state.token.length > 0) {
    localStorage.setItem("token", this.state.token);
    var decoded = jwt_decode(this.state.token.split(' ')[1]);
    localStorage.setItem("user_id", decoded._id);
    localStorage.setItem("username", decoded.username);
    redirectVar = <Redirect to="/studentprofilepage" />
  }
  else{
      redirectVar = <Redirect to="/student" />
  }
  return(
    <div>
      {redirectVar}
        <br />
          <div className="container">
            <div className="login-form">
              <div className="main-div">
                <div className="panel">
                  <h2>Student Sign In</h2>
                  <span>Please enter your username and password</span>
                </div>
                <div className="form-group">
                  <label>
                    Username
                  </label>
                  <input onChange = {this.usernameChangeHandler}value={this.state.username}
                  type="text" className="form-control" name="username" placeholder="Username" />
                </div>
                <div className="form-group">
                  <label>
                    Password
                  </label>
                  <input onChange = {this.passwordChangeHandler}value={this.state.password} 
                  type="password" className="form-control" name="password" placeholder="Password" />
                </div>
                <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>    
                <br />
                <br />
                <div>
                  <span>
                    First Time User?&nbsp;
                    <a href="http://localhost:3000/studentsignup">Sign Up Here.</a>
                  </span>
                </div>  
                <br />
                <form action="http://localhost:3000/employer">
                  <input type="submit" className="btn btn-secondary" value="Switch to Employer" />
                </form>
                {/* <button type="button" className="btn btn-secondary">Switch to Employer</button>         */}
              </div>
            </div>
          </div>
     </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    studentDetails : state.login.studentDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillStudentDetails : (details) => dispatch(fillStudentDetails(details)),
    fillStudentBasicDetails : (details) => dispatch(fillStudentBasicDetails(details)),
    fillStudentEducationDetails : (details) => dispatch(fillStudentEducationDetails(details)),
    fillStudentExperienceDetails : (details) => dispatch(fillStudentExperienceDetails(details)),
    fillStudentImageDetails : (details) => dispatch(fillStudentImageDetails(details)),
    fillStudentResumeDetails : (details) => dispatch(fillStudentResumeDetails(details)),
  }
}
// export Student Sign In Component
export default connect(mapStateToProps, mapDispatchToProps)(StudentSignIn);
