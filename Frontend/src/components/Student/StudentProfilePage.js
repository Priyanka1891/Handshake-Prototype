import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Redirect} from 'react-router';
import StudentNavbar from './StudentNavbar';
import EmployerNavbar from '../Employer/EmployerNavbar'
import Details from './Details';
import Education from './Education';
import Experience from './Experience';
import Resume from './Resume';
import MessageApp from '../Message/MessageApp';
import { fillStudentDetails } from "../../common_store/actions/login";
import { backendURL } from   "../../Utils/config"


const initialState={
  addEducation : false,
  addExperience : false,
  openMessageBox : false,
  reRender : false
}
var inputFile = createRef(null) 

class StudentProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  enableApply = ()=> {
    console.log("Dummy Enable Apply")
  }

  imageButtonHandler = (e)=> {
    inputFile.current.click();
  }

  dispatch = async (state) => {
    await this.props.fillStudentDetails(state)
    return this.props.studentDetails;
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
      var studentDetails = this.props.studentDetails;
      studentDetails.image = e.target.result;
      const data = {details : studentDetails , upload_image : true};
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios.post(`${backendURL}/student/editdetails`, data)
        .then(response => {
          if (response.data.code===200) {
            // this.props.fillStudentImageDetails(studentDetails.image);
            this.dispatch(studentDetails).then((result) => { 
              this.setState({reRender: true})});
            window.alert("Image uploaded successfully");
          } else {
            window.alert("Image upload failed");
          }});
      } 
  }

  addStudentEducation = (e) =>{
    this.setState({
      addEducation : true
    })
  }

  addStudentExperience = (e) =>{
    this.setState({
      addExperience : true
    })
  }

  openMessageBox = (e) => {
    this.setState({
      openMessageBox : true
    })
  }

  closeMessageBox = (e) => {
    this.setState({
      openMessageBox : false
    })
  }

  render() {
    let redirectVar = null;
    if (this.state.addEducation) {
      redirectVar = <Redirect to='/addeducation' />
    }
    if (this.state.addExperience) {
      redirectVar = <Redirect to='/addexperience' />
    }
    console.log("PROPS : ", this.props.studentDetails);

    return(
      <React.Fragment>
      {redirectVar}
        <br />          
        {this.props.studentDetails.editmode ? (<StudentNavbar />) :  (<EmployerNavbar />)}
        <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="http://code.jquery.com/jquery-1.11.1.min.js" />
        <link rel="stylesheet" href="style.css"  />
        <div className="container">
          <div className="row profile">
            <div className="col-md-3">
              <div className="profile-sidebar">
                <div className="profile-userpic">
                  {this.props.studentDetails.image ?
                    <img src={this.props.studentDetails.image} className="img-responsive" alt="" /> :
                    <img src="https://static.change.org/profile-img/default-user-profile.svg" className="img-responsive" alt="" />
                  } 
                </div> 
                <div className="profile-userbuttons">
                  <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={this.imageChangeHandler}/>
                  {this.props.studentDetails.editmode?(<button onClick={this.imageButtonHandler} type="button" className="glyphicon glyphicon-camera btn btn-info">
                  </button>):(<div></div>)}
                </div>
                <div className="profile-usertitle">
                  <div className="profile-usertitle-name">
                    Welcome&nbsp;{this.props.studentDetails.username}
                  </div>
                  <div className="profile-usertitle-job">
                  {this.props.studentDetails.studentExperience.length ? 
                    this.props.studentDetails.studentExperience[this.props.studentDetails.studentExperience.length-1].title : null}
                  </div>
                </div>
                <div className="profile-userbuttons">
                  {this.props.studentDetails.editmode ? <div/> : <button type="button" className="btn btn-primary btn-lg" onClick = {this.openMessageBox} >Message</button> }
                </div>
                <div className="profile-usermenu">
                  <ul className="nav">
                    <li className="active">
                      <a href="#Details">
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
                        {this.props.studentDetails.editmode ? "Upload Resume" : "View Resume"}
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
                <div id='Details'><Details /></div>
                <h2  id='Education'>Education Overview&nbsp;&nbsp;
                {this.props.studentDetails.editmode ?
                 <button type="button" onClick = {this.addStudentEducation} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-plus-sign"></span></button> : <div/>}</h2>
                <div>
                  {
                    this.props.studentDetails.studentEducation.map((education,index) => (
                      <div><Education index={this.props.studentDetails.studentEducation.length - 1 - index} /></div>
                    ))
                  }
                </div>
                <h2 id='Experience'>Experience Overview&nbsp;&nbsp;
                {this.props.studentDetails.editmode ? 
                  <button type="button" onClick = {this.addStudentExperience} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-plus-sign"></span></button> :<div/>}</h2>
                  <div>
                  {
                    this.props.studentDetails.studentExperience.map((experience,index) => (
                      <div><Experience index={this.props.studentDetails.studentExperience.length - 1 - index} /></div>
                    ))
                  }
                </div>
                <br/>
                <div id="Resume"><Resume enableapply = {this.enableApply}/></div></div> 
                <div className="col-md-offset-5">
                  {this.state.openMessageBox ? <div style={{"height" : "40%", "width" : "40%"}}><MessageApp closeMessageBox = {this.closeMessageBox}/> </div> : <div/> }
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
    studentDetails : state.login.studentDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillStudentDetails : (details) => dispatch(fillStudentDetails(details))
  }
}

// export StudentProfilePage Component
export default connect(mapStateToProps, mapDispatchToProps)(StudentProfilePage);



