import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import { fillStudentDetails } from "../../common_store/actions/index";

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
  }

  nameChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.studentDetails  =  this.state.studentDetails.studentDetails ? 
                                            this.state.studentDetails.studentDetails  : {};
    newStudentDetails.studentDetails.name = e.target.value;
    this.setState({studentDetails : newStudentDetails});
  }

  contactnoChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.studentDetails  =  this.state.studentDetails.studentDetails ? 
    this.state.studentDetails.studentDetails  : {};
    newStudentDetails.studentDetails.contactno = e.target.value;
    this.setState({studentDetails : newStudentDetails});
  }

  dobChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.studentDetails  =  this.state.studentDetails.studentDetails ? 
    this.state.studentDetails.studentDetails  : {};
    newStudentDetails.studentDetails.dob = e.target.value;
    this.setState({studentDetails : newStudentDetails});
  }

  cityChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.studentDetails  =  this.state.studentDetails.studentDetails ? 
    this.state.studentDetails.studentDetails  : {};
    newStudentDetails.studentDetails.city = e.target.value;
    this.setState({studentDetails : newStudentDetails});
  }

  stateChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.studentDetails  =  this.state.studentDetails.studentDetails ? 
    this.state.studentDetails.studentDetails  : {};
    newStudentDetails.studentDetails.state = e.target.value;
    this.setState({studentDetails : newStudentDetails});
  }

  countryChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.studentDetails  =  this.state.studentDetails.studentDetails ? 
    this.state.studentDetails.studentDetails  : {};
    newStudentDetails.studentDetails.country = e.target.value;
    this.setState({studentDetails : newStudentDetails});
  }

  objectiveChangeHandler = (e) => {
    var newStudentDetails = this.state.studentDetails;
    newStudentDetails.studentDetails  =  this.state.studentDetails.studentDetails ? 
    this.state.studentDetails.studentDetails  : {};
    newStudentDetails.studentDetails.objective = e.target.value;
    console.log("HERE ", newStudentDetails);
    this.setState({studentDetails : newStudentDetails});
  }

  dispatch = async (state) => {
    await this.props.fillStudentDetails(state)
    return this.props.studentDetails;
  }

  submitStudentDetails = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data ", this.state.studentDetails, axios.defaults.headers);
    const data = {details : this.state.studentDetails , edit_details : true}
                  // edit_education_details : false, edit_experience_details : false}
    axios.post('http://localhost:3001/editstudentdetails', data)
      .then(response => {
        console.log("Edit Response: ", response);
        if (response.status === 200) {
          this.dispatch(this.state.studentDetails)
            .then(result => {
              this.setState({
                detailsSubmitted : true
              })
             console.log("Edited details: ", JSON.stringify(result));
            })
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
                {this.props.studentDetails.studentDetails?this.props.studentDetails.studentDetails.name:null}value={this.state.name}
                type="text" className="form-control" name="name" />
                <br/>
                <label>Date Of Birth</label>
                <input style={{width:"300px"}} onChange = {this.dobChangeHandler}placeholder={this.props.studentDetails.studentDetails?this.props.studentDetails.studentDetails.dob:null}value={this.state.dob}
                type="text" className="form-control" name="dob" />
                <br/>
                <label>City</label>
                <input style={{width:"300px"}} onChange = {this.cityChangeHandler}placeholder={this.props.studentDetails.studentDetails?this.props.studentDetails.studentDetails.city:null}value={this.state.city} 
                type="text" className="form-control" name="city" />
                <br/>
                <label>State</label>
                <input style={{width:"300px"}} onChange = {this.stateChangeHandler}placeholder={this.props.studentDetails.studentDetails?this.props.studentDetails.studentDetails.state:null} value={this.state.state}
                type="text" className="form-control" name="state" />
                <br/>
                <label>Country</label>
                <input style={{width:"300px"}} onChange = {this.countryChangeHandler}placeholder={this.props.studentDetails.studentDetails?this.props.studentDetails.studentDetails.country:null} value={this.state.country}
                type="text" className="form-control" name="country" />
                <br/>
                <label>Contact No:</label>
                <input style={{width:"300px"}} onChange = {this.contactnoChangeHandler}placeholder={this.props.studentDetails.studentDetails?this.props.studentDetails.studentDetails.contactno:null} value={this.state.contactno}
                type="number" className="form-control" name="contactno" />
                <br/>
                <label>Objective</label>
                <input  style={{width:"300px"}} onChange = {this.objectiveChangeHandler}placeholder={this.props.studentDetails.studentDetails?this.props.studentDetails.studentDetails.objective:null} value={this.state.objective}
                type="text" className="form-control" name="objective" />
                <br />
              <button type="button" onClick={this.submitStudentDetails} className="btn btn-success">Save</button> 
            </div>
          </div>
        </div>   
    </div>                
    )    
  }
}

function mapStateToProps(state) {
  return {
    studentDetails : state.studentDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillStudentDetails : (details) => dispatch(fillStudentDetails(details))
  }
}

// export default Editdetails;
export default connect(mapStateToProps, mapDispatchToProps)(Editdetails);
