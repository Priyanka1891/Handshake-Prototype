import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import EmployerNavbar from './EmployerNavbar';
import Details from  './Details';
import { fillEmployerDetails } from "../../common_store/actions/login";
import { backendURL } from   "../../Utils/config"
import StudentNavbar from '../Student/StudentNavbar';


const initialState={
  reRender : false
}
var inputFile = createRef(null) 


class EmployerProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  imageButtonHandler = (e)=> {
    inputFile.current.click();
  }

  dispatch = async (state) => {
    await this.props.fillEmployerDetails(state)
    return this.props.employerDetails;
  }

  imageChangeHandler = (e) => {
    if (!e.target.files[0]) {
      window.alert("Image upload failed, either path is empty or some error happened");
      return;
    }
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      var employerDetails = this.props.employerDetails;
      employerDetails.image = e.target.result;
      const data = {details : employerDetails , upload_image : true};
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios.post(`${backendURL}/employer/editdetails`, data)
        .then(response => {
          if (response.data.code===200) {
            this.dispatch(employerDetails).then((result) => { 
              this.setState({reRender: true})});
            window.alert("Image uploaded successfully");
          } else {
            window.alert("Image upload failed");
          }});
      } 
  }

  render() {
    let viewMode = this.props.location.state && this.props.location.state.isStudent;
    return(
      <React.Fragment>
        {  viewMode ? <StudentNavbar /> : <EmployerNavbar />}
        <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="http://code.jquery.com/jquery-1.11.1.min.js" />
        <link rel="stylesheet" href="style.css"  />
        <div className="container">
          <div className="row profile">
            <div className="col-md-3">
              <div className="profile-sidebar">
              <div className="profile-userpic">
                  {this.props.employerDetails.image ?
                    <img src={this.props.employerDetails.image} className="img-responsive" alt="" /> :
                    <img src="https://static.change.org/profile-img/default-user-profile.svg" className="img-responsive" alt="" />
                  } 
                </div> 
                {!viewMode ?
                  (<div className="profile-userbuttons">
                    <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={this.imageChangeHandler}/>
                    <button onClick={this.imageButtonHandler} type="button" className="glyphicon glyphicon-camera btn btn-info">
                    </button>
                  </div>) : <div/>
                }
                <div className="profile-usertitle">
                  <div className="profile-usertitle-name">
                    {this.props.employerDetails.username}
                  </div>
                </div>
                <div className="profile-usermenu">
                  <ul className="nav">
                    <li className = "active">
                      <a href="">
                        <i className="glyphicon glyphicon-user" />
                        Profile Overview
                        {' '}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-offset-0">
              <div className="profile-content">
              <div className="col-md-offset-4">
                <div id='Details'><Details editmode ={!viewMode}/></div>
              </div>
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
    employerDetails : state.login.employerDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillEmployerDetails : (details) => dispatch(fillEmployerDetails(details))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerProfilePage);