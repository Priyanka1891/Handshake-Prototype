import React, {Component} from 'react';
import '../../App.css';

// Define a Login Component
class Login extends Component{
  render() {
    window.localStorage.clear();
    return(
      <div className="container"> 
        <img alt=" " src='Handshake.jpeg' />
        <div className="login-form">
          <h2>Welcome to Handshake</h2>
          <div className="main-div"> 
            <h3>Sign in/Sign Up as</h3>
            <br />
            {/* <button type="button" className="btn btn-primary" onClick={this.props.routeStudent}> */}
            <form action="http://localhost:3000/student">
              <input type="submit" className="btn btn-primary" value="Student" />
            </form>
            <br />
            {/* <button type="button" className="btn btn-primary" onClick={this.props.routeEmployer}> */}
            <form action="http://localhost:3000/employer">
              <input type="submit" className="btn btn-primary" value="Employer" />
            </form>             
          </div>
        </div>
      </div>
    )
  }
}

export default Login;