import React, {Component} from 'react';
import {connect} from 'react-redux';
import StudentNavbar from './StudentNavbar';
import EmployerNavbar from '../Employer/EmployerNavbar'
import Details from './Details';
import Education from './Education';
import Experience from './Experience';
import Resume from './Resume';


class StudentProfilePage extends Component {
  render() {
    return(
      <React.Fragment>
        {this.props.studentDetails.editmode ? (<StudentNavbar />) : (<EmployerNavbar />)}
        <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="http://code.jquery.com/jquery-1.11.1.min.js" />
        <link rel="stylesheet" href="style.css"  />
        <div className="container">
          <div className="row profile">
            <div className="col-md-3">
              <div className="profile-sidebar">
                <div className="profile-userpic">
                  <img src="https://static.change.org/profile-img/default-user-profile.svg" className="img-responsive" alt="" />
                </div>
        
                <div className="profile-usertitle">
                  <div className="profile-usertitle-name">
                    {this.props.studentDetails.username}
                  </div>
                  {/* <div className="profile-usertitle-job">
                    Full Stack Developer
                  </div> */}
                </div>
                {/* <div className="profile-userbuttons">
                  <button type="button" className="btn btn-success btn-sm">Follow</button>
                  <button type="button" className="btn btn-danger btn-sm">Message</button>
                </div> */}
                <div className="profile-usermenu">
                  <ul className="nav">
                    {/* <li className="active">
                      <a href="#">
                        <i className="glyphicon glyphicon-home" />
                        Profile Overview
                        {' '}
                      </a>
                    </li> */}
                    <li>
                      <a href="#">
                        <i className="glyphicon glyphicon-user" />
                        Profile Overview
                        {' '}
                      </a>
                    </li>
                    <li>
                      <a href="#Education">
                        <i className="glyphicon glyphicon-book" />
                        Education
                        {' '}
                      </a>
                    </li>
                    {/* <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul> */}
                    <li>
                      <a href="#Experience">
                        <i className="glyphicon glyphicon-briefcase" />
                        Experience
                        {' '}
                      </a>
                    </li>
                    <li>
                      <a href="#Resume">
                        <i className="glyphicon glyphicon-file" />
                        Upload Resume
                        {' '}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-offset-0">
              <div className="profile-content">
                {/* <p>Some user related content goes here...</p> */}
                <div id='Details'><Details /></div>
                <div id='Education'><Education /></div>
                <div id='Experience'><Experience /></div>
                <div id='Resume'><Resume /></div>
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
    studentDetails : state.studentDetails
  }
}

// export StudentProfilePage Component
export default connect(mapStateToProps, null)(StudentProfilePage);



