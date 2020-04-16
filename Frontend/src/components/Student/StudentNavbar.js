/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';
// import { fillStudentDetails } from "../../common_store/actions/login";


// create the Navbar Component
class StudentNavbar extends Component {

    // dispatch = async (state) => {
    //   await this.props.fillStudentDetails(state)
    //   return this.props.studentDetails;
    // }

    // resetOtherStudentDetails = ()=> {
    //   if (this.props.otherStudentDetails) {
    //     this.dispatch(this.props.studentDetails).then(res => {console.log("Redux state updated")});
    //   }
    // }

    render(){
        return(
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand">Handshake</a>
              </div>
              <ul className="nav navbar-nav">
                <li><Link to="/studentprofilepage" ><span className="glyphicon glyphicon-home" /></Link></li>
                <li><Link to="/studentlist" >Students</Link></li>
                <li><Link to="/studentjobs" >Jobs</Link></li>
                <li><Link to="/studentevents" >Events</Link></li>
                <li><Link to="/studentapplications"  >Applications</Link></li>
                <li><Link to={{pathname: "/messages", state: {isEmployer: false}}}>Messages&nbsp;&nbsp;<span className="glyphicon glyphicon-comment"/></Link></li>
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

// function mapStateToProps(state) {
//   return {
//     studentDetails : state.login.studentDetails
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     fillStudentDetails : (details) => dispatch(fillStudentDetails(details))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(StudentNavbar);
export default StudentNavbar;

