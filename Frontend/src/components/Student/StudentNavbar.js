/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{Component} from 'react';
import {Link} from 'react-router-dom';

// create the Navbar Component
class StudentNavbar extends Component {
    render(){
        return(
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand">Handshake</a>
              </div>
              <ul className="nav navbar-nav">
                <li><Link to="/studentprofilepage"><span className="glyphicon glyphicon-home" /></Link></li>
                <li><Link to="/studentlist">Students</Link></li>
                <li><Link to="/studentjobs">Jobs</Link></li>
                <li><Link to="/studentevents">Events</Link></li>
                <li><Link to="/studentapps">Applications</Link></li>
                {/* <li><Link to="/student_messages">Messages&nbsp;&nbsp;<span className="glyphicon glyphicon-comment"/></Link></li> */}
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/">
                    <span className="glyphicon glyphicon-user" />
                    &nbsp;Logout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )
    }
}

export default StudentNavbar;