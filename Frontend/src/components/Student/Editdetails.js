import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import { fillStudentDetails } from "../../common_store/actions/login";
import { fillStudentBasicDetails } from "../../common_store/actions/student"
import { backendURL } from   "../../Utils/config"


const initialState={
  detailsSubmitted : false,
  studentDetails : null
}


class Editdetails extends Component{

  constructor(props){
      super(props);      
      this.state = initialState;
      this.state.studentDetails = this.props.studentDetails;
      this.nameChangeHandler = this.nameChangeHandler.bind(this);
      this.dobChangeHandler = this.dobChangeHandler.bind(this);
      this.cityChangeHandler = this.cityChangeHandler.bind(this);
      this.stateChangeHandler = this.stateChangeHandler.bind(this);
      this.countryChangeHandler = this.countryChangeHandler.bind(this);
      this.objectiveChangeHandler = this.objectiveChangeHandler.bind(this);
      this.contactnoChangeHandler = this.contactnoChangeHandler.bind(this);
      this.submitStudentDetails = this.submitStudentDetails.bind(this);
      this.skillsChangeHandler = this.skillsChangeHandler.bind(this);

  }

  nameChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.basicDetails  =  this.state.studentDetails.basicDetails ? 
                                            this.state.studentDetails.basicDetails  : {};
    newStudentDetails.basicDetails.name = e.target.value;
    this.setState({studentDetails : newStudentDetails});
  }

  contactnoChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.basicDetails  =  this.state.studentDetails.basicDetails ? 
    this.state.studentDetails.basicDetails  : {};
    newStudentDetails.basicDetails.contactno = e.target.value;
    this.setState({studentDetails : newStudentDetails});
  }

  dobChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.basicDetails  =  this.state.studentDetails.basicDetails ? 
    this.state.studentDetails.basicDetails  : {};
    newStudentDetails.basicDetails.dob = e.target.value;
    this.setState({studentDetails : newStudentDetails});
  }

  cityChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.basicDetails  =  this.state.studentDetails.basicDetails ? 
    this.state.studentDetails.basicDetails  : {};
    newStudentDetails.basicDetails.city = e.target.value;
    this.setState({studentDetails : newStudentDetails});
  }

  stateChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.basicDetails  =  this.state.studentDetails.basicDetails ? 
    this.state.studentDetails.basicDetails  : {};
    newStudentDetails.basicDetails.state = e.target.value;
    this.setState({studentDetails : newStudentDetails});
  }

  countryChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.basicDetails  =  this.state.studentDetails.basicDetails ? 
    this.state.studentDetails.basicDetails  : {};
    newStudentDetails.basicDetails.country = e.target.value;
    this.setState({studentDetails : newStudentDetails});
  }

  objectiveChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.basicDetails  =  this.state.studentDetails.basicDetails ? 
    this.state.studentDetails.basicDetails  : {};
    newStudentDetails.basicDetails.objective = e.target.value;
    console.log("HERE ", newStudentDetails);
    this.setState({studentDetails : newStudentDetails});
  }

  skillsChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.basicDetails  =  this.state.studentDetails.basicDetails ? 
    this.state.studentDetails.basicDetails  : {};
    newStudentDetails.basicDetails.skills = e.target.value;
    console.log("HERE ", newStudentDetails);
    this.setState({studentDetails : newStudentDetails});
  }

  emailChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.email  =  this.state.studentDetails.email ? 
    this.state.studentDetails.basicDetails  : {};
    newStudentDetails.email = e.target.value;
    console.log("HERE ", newStudentDetails);
    this.setState({studentDetails : newStudentDetails});
  }


  dispatch = async (state) => {
    await this.props.fillStudentDetails(state)
    return this.props.studentDetails;
  }

  // cancelStudentDetails=()=>{

  // }

  submitStudentDetails = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    // console.log("Sending Data ", this.state.studentDetails, axios.defaults.headers);
    const data = {details : this.state.studentDetails , edit_details : true};
    axios.post(`${backendURL}/student/editdetails`, data)
      .then(response => {
        console.log("Edit Response: ", response);
        if (response.status === 200) {
          console.log("Details are",this.state.studentDetails);
          this.props.fillStudentBasicDetails(this.state.studentDetails.basicDetails);
          this.dispatch(this.state.studentDetails)
            .then(result => {
              this.setState({
                detailsSubmitted : true
              })
            });
        }
    });
  }

  render() {
    let redirectVar = null;
    if (this.state.detailsSubmitted) {
      redirectVar = <Redirect to="/studentprofilepage" />
    }
    return(
      <div>
      {redirectVar}
        <br />              
        <div className="col-md-offset-0">
           <div className="profile-content">
              <div className="col-md-offset-4">
                <h2>Edit Profile</h2>
                <label>Name</label>
                <input style={{width:"300px"}} onChange = {this.nameChangeHandler}placeholder=
                {this.props.studentDetails.basicDetails?this.props.studentDetails.basicDetails.name:null}value={this.state.name}
                type="text" className="form-control" name="name" />
                <br/>
                <label>Date Of Birth</label>
                <input style={{width:"300px"}} onChange = {this.dobChangeHandler}placeholder={this.props.studentDetails.basicDetails?
                this.props.studentDetails.basicDetails.dob:null}value={this.state.dob}
                type="date" className="form-control" name="dob" />
                <br/>
                <label>City</label>
                <input style={{width:"300px"}} onChange = {this.cityChangeHandler}placeholder={this.props.studentDetails.basicDetails?this.props.studentDetails.basicDetails.city:null}value={this.state.city} 
                type="text" className="form-control" name="city" />
                <br/>
                <label>State</label>
                <input style={{width:"300px"}} onChange = {this.stateChangeHandler}placeholder={this.props.studentDetails.basicDetails?this.props.studentDetails.basicDetails.state:null} value={this.state.state}
                type="text" className="form-control" name="state" />
                <br/>
                <label>Country</label>
                <input style={{width:"300px"}} onChange = {this.countryChangeHandler}placeholder={this.props.studentDetails.basicDetails?this.props.studentDetails.basicDetails.country:null} value={this.state.country}
                type="text" className="form-control" name="country" />
                <br/>
                <label>Contact No:</label>
                <input style={{width:"300px"}} onChange = {this.contactnoChangeHandler}placeholder={this.props.studentDetails.basicDetails?this.props.studentDetails.basicDetails.contactno:null} value={this.state.contactno}
                type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required className="form-control" name="contactno" />
                <br/>
                <label>Email:</label>
                <input style={{width:"300px"}} onChange = {this.emailChangeHandler}placeholder={this.props.studentDetails.email?this.props.studentDetails.email:null} value={this.state.email}
                type="email" className="form-control" name="email" multiple />
                <br/>
                <label>Skills</label>
                <input style={{width:"300px"}} onChange = {this.skillsChangeHandler}value={this.state.skills} placeholder={this.props.studentDetails.basicDetails?this.props.studentDetails.basicDetails.skills:null}
                type="text" className="form-control" name="skills" />
                <br/>
                <label>Objective</label>
                <input  style={{width:"300px"}} onChange = {this.objectiveChangeHandler}placeholder={this.props.studentDetails.basicDetails?this.props.studentDetails.basicDetails.objective:null} value={this.state.objective}
                type="text" className="form-control" name="objective" />
                <br />
              <button type="button" onClick={this.submitStudentDetails} className="btn btn-success">Save</button> 
              {/* <button type="button" onClick={this.cancelStudentDetails} className="btn btn-success">Cancel</button>  */}
            </div>
          </div>
        </div>   
    </div>                
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
    fillStudentDetails : (details) => dispatch(fillStudentDetails(details)),
    fillStudentBasicDetails : (details) => dispatch(fillStudentBasicDetails(details))
  }
}

// export default Editdetails;
export default connect(mapStateToProps, mapDispatchToProps)(Editdetails);
