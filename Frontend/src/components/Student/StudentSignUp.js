import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import { fillStudentDetails } from "../../common_store/actions/login";
import { backendURL } from   "../../Utils/config"



const initialState={
      username : "",
      password : "",
      email : "",
      colgname : "",
      signUpDone : false
}

class StudentSignUp extends Component{

constructor(props) {
    super(props);
    this.state=initialState;
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.colgnameChangeHandler = this.colgnameChangeHandler.bind(this);
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

emailChangeHandler = (e) => {
  this.setState({
    email : e.target.value,
  })
}

colgnameChangeHandler = (e) => {
  this.setState({
    colgname : e.target.value,
  })
}

submitDetails = (e) => {
  e.preventDefault();
  const data = {
    username : this.state.username,
    password : this.state.password,
    email : this.state.email,
    colgname : this.state.colgname,
    editmode : true
  }
  
  if(data.colgname === '') {
    window.alert("Please enter college name");
    return;
  }

  axios.defaults.withCredentials = true;
  console.log("Sending Data "+JSON.stringify(data));
  axios.post(`${backendURL}/student/signup`,data)
    .then(response => {
      this.setState({
        signUpDone : true
      });
      window.alert(response.data);
    });
}

render(){
      let redirectVar = null;
      if (this.state.signUpDone) {
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
                  <h2>Student Details</h2>
                  <span>Please enter your details</span>
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input onChange = {this.usernameChangeHandler}value={this.state.username} 
                  type="text" className="form-control" name="username" placeholder="Username" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input onChange = {this.emailChangeHandler}value={this.state.email} 
                  type="email" className="form-control" name="email" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input onChange = {this.passwordChangeHandler}value={this.state.password} 
                  type="password" className="form-control" name="password" placeholder="Password" />
                </div>
                <div className="form-group">
                  <label>College Name</label>
                  {/* <input type="text" className="form-control" name="colgname" placeholder="College Name" /> */}
                  <select className="form-control"
                  onChangeCapture = {this.colgnameChangeHandler} value={this.state.colgname}>
                    <option>-----Choose your University-----</option>
                    <option>UCLA</option>
                    <option>Columbia University</option>
                    <option>Lincoln School</option>
                    <option>UC Berkley</option>
                    <option>Stanford University</option>
                  </select>
                </div>
                <button type="button" className="btn btn-primary" onClick = {this.submitDetails}>Submit Details</button>
                <br />
                <br />
                <form action="http://localhost:3000/employer">
                  <input type="submit" className="btn btn-secondary" value="Switch to Employer" />
                </form>        
              </div>
            </div>
          </div>
        </div>
        )
    }
}

// export Student Sign Up Component

function mapStateToProps(state) {
  return {
    studentDetails : state.login.studentDetails
  }
}
  
function mapDispatchToProps(dispatch) {
  return {
    fillStudentDetails : (details) => dispatch(fillStudentDetails(details))
  }
}
  // export Student Sign Up Component
export default connect(mapStateToProps, mapDispatchToProps)(StudentSignUp);
