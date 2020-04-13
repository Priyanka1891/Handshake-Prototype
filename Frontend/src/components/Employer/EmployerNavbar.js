/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{Component} from 'react';
import {Link} from 'react-router-dom';

// create the Navbar Component
class EmployerNavbar extends Component {
    render(){
        return(
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand">Handshake</a>
              </div>
              <ul className="nav navbar-nav">
                <li><Link to="/employerprofilepage"><span className="glyphicon glyphicon-home" /></Link></li>
                <li><Link to="/employerjobs">Jobs</Link></li>
                <li><Link to="/employerevents">Events</Link></li>
                <li><Link to="/employersearchstudents">Students</Link></li>
                <li><Link to={{pathname: "/messages", state: {isEmployer: true}}}>Messages&nbsp;&nbsp;<span className="glyphicon glyphicon-comment"/></Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/">
                    <span className="glyphicon glyphicon-off" />
                    &nbsp;Logout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )
    }
}

export default EmployerNavbar;