import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { fillEmployerDetails } from "../../common_store/actions/login";
import axios from 'axios';
import { backendURL } from   "../../Utils/config"

const jwt_decode = require('jwt-decode');


const initialState={
  username : "",
  password : "", 
  token: ""
}


class EmployerSignIn extends Component{

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
    await this.props.fillEmployerDetails(state)
    return this.props.employerDetails;
  }

  login = (e) => {
    e.preventDefault();
    const data = {
      username : this.state.username,
      password : this.state.password,
    }

  axios.defaults.withCredentials = true;
    console.log("Sending Data "+JSON.stringify(data));
    axios.post(`${backendURL}/employer/signin`,data)
    .then(response => {
      console.log("Response received ", response);
      this.dispatch(response.data.details)
        .then(result => {
          this.setState({
            token: response.data.value
          });
          console.log("Employer details:", result);
      });
  })
} 
render(){
 let redirectVar = null;
    if (this.state.token.length > 0) {
      localStorage.setItem("token", this.state.token);
      var decoded = jwt_decode(this.state.token.split(' ')[1]);
      localStorage.setItem("user_id", decoded._id);
      localStorage.setItem("username", decoded.username);
      redirectVar = <Redirect to="/employerprofilepage" />
    }
    else{
      redirectVar = <Redirect to="/employer" />
    }
    return(
      <div>
      {redirectVar}
        <br />
         <div className="container">
            <div className="login-form">
              <div className="main-div">
                <div className="panel">
                  <h2>Employer Sign In</h2>
                  <span>Please enter your username and password</span>
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input onChange = {this.usernameChangeHandler}value={this.state.username} 
                  type="text" className="form-control" name="username" placeholder="Username" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input onChange = {this.passwordChangeHandler}value={this.state.password} 
                  type="password" className="form-control" name="password" placeholder="Password" />
                </div>
                <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>    
                <br />
                <br />
                <div>
                  <span>
                    First Time User?&nbsp;
                    <a href="http://localhost:3000/employersignup">Sign Up Here.</a>
                  </span>
                </div>  
                <br />
                <form action="http://localhost:3000/student">
                  <input type="submit" className="btn btn-secondary" value="Switch to Student" />
                </form>
                {/* <button type="button" className="btn btn-secondary">Switch to Student</button>             */}
              </div>
            </div>
          </div>
          </div>
        )
    }
}


function mapStateToProps(state) {
  return {
    employerDetails : state.login.employerDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillEmployerDetails : (details) => dispatch(fillEmployerDetails(details))
  }
}
// export Employer Sign In Component
export default connect(mapStateToProps, mapDispatchToProps)(EmployerSignIn);

