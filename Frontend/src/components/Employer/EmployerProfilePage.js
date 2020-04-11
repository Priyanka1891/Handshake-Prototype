import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import EmployerNavbar from './EmployerNavbar';
import Details from  './Details';
import { fillEmployerDetails } from "../../common_store/actions/index";

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
      axios.post('http://localhost:3001/employer/editdetails', data)
        .then(response => {
          if (response.data.code==200) {
            this.dispatch(employerDetails).then((result) => { 
              this.setState({reRender: true})});
            window.alert("Image uploaded successfully");
          } else {
            window.alert("Image upload failed");
          }});
      } 
  }

  render() {
    return(
      <React.Fragment>
        <EmployerNavbar />
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
                <div className="profile-userbuttons">
                  <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={this.imageChangeHandler}/>
                  <button onClick={this.imageButtonHandler} type="button" className="glyphicon glyphicon-camera btn btn-info">
                  </button>
                </div>
                <div className="profile-usertitle">
                  <div className="profile-usertitle-name">
                    {this.props.employerDetails.username}
                  </div>
                </div>
                <div className="profile-usermenu">
                  <ul className="nav">
                    <li className = "active">
                      <a href="#">
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
                <div id='Details'><Details /></div>
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
    employerDetails : state.employerDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillEmployerDetails : (details) => dispatch(fillEmployerDetails(details))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerProfilePage);




































{/* <div className="container" >
<div className="login-form" >
<div className="style__card___1rhof" data-hook="card" />
<div className="style__card-item___B1f7m style__large___Kv76x" />
<div className="style__content___IR0nx" data-hook="identity-card" id="profilePicture" />
<div className="style__institution-avatar___3xmzR"><div className="style__avatar___2JuVa style__avatar-color-red___2pJ92 style__avatar-bordered___2TTCd style__avatar-small___2kw-_"><div className="style__avatar-image___2LV5H" style={{backgroundImage: "url(&quot;https://s3.amazonaws.com/handshake.production/app/public/assets/schools/122/small/hs-school-logo-data.?1559840573&quot;);"}} /></div></div>
<div className="style__avatar-image___2LV5H" style={{backgroundImage: "url(&quot;https://s3.amazonaws.com/handshake.production/app/public/assets/schools/122/small/hs-school-logo-data.?1559840573&quot;);"}} />
<div className="style__flex___fCvpa style__align-center___GzLZc style__column___1Ye52">
  <div className="style__user-avatar___2KxEV">
    <button className="style__edit-photo___B-_os" type="button" aria-label="edit photo" data-hook="profile-photo">
      <div className="style__content___DtsJK">
        <svg aria-hidden="true" data-prefix="fas" data-icon="camera" className="svg-inline--fa fa-camera fa-w-16 icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" />
        </svg>
        <div className="style__text___2ilXR style__small___1Nyai style__info___18ZP5">Add Photo</div>
      </div>
    </button>
  </div>
  <h1 className="style__heading___29i1Z style__huge___YeESj style__fitted___3L0Tr">Priyanka Sharma</h1>
  <div className="style__text___2ilXR style__large___3qwwG style__fitted___1GslH style__semibold___3bkz0 style__center___ihjch">San Jose State University</div>
  <div className="style__text___2ilXR style__large___3qwwG style__fitted___1GslH style__semibold___3bkz0 style__center___ihjch">Masters, Software Engineering</div>
  <div className="style__text___2ilXR style__large___3qwwG style__fitted___1GslH style__muted___2z7cM style__center___ihjch" />
  <div className="fullstory-hidden">
    <div className="style__text___2ilXR style__large___3qwwG style__fitted___1GslH style__muted___2z7cM">Masters • GPA: 0.0</div>
  </div>
</div>
</div>
</div> */}




