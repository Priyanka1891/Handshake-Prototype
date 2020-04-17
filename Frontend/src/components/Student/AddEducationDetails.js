import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import { fillStudentDetails } from "../../common_store/actions/login";
import { backendURL } from   "../../Utils/config"
import StudentNavbar from './StudentNavbar';


const initialState={
  detailsSubmitted : false,
  studentDetails : null,
  newEducationDetails : {}
}
class AddEducationDetails extends Component{

  constructor(props){
      super(props);
      this.state= initialState;
      this.state.studentDetails = this.props.studentDetails;
      this.colgnameChangeHandler = this.colgnameChangeHandler.bind(this);
      this.locationChangeHandler = this.locationChangeHandler.bind(this);
      this.degreeChangeHandler = this.degreeChangeHandler.bind(this);
      this.majorChangeHandler = this.majorChangeHandler.bind(this);
      this.yearofpassingChangeHandler = this.yearofpassingChangeHandler.bind(this);
      this.cgpaChangeHandler = this.cgpaChangeHandler.bind(this);
      this.submitStudentDetails = this.submitStudentDetails.bind(this);
  }

  colgnameChangeHandler = (e) => {
    var newEducationDetails = this.state.newEducationDetails;
    newEducationDetails.colgname = e.target.value;
    this.setState({ newEducationDetails: newEducationDetails});
  }

  locationChangeHandler = (e) => {
    var newEducationDetails = this.state.newEducationDetails;
    newEducationDetails.location = e.target.value;
    this.setState({ newEducationDetails: newEducationDetails});
  }

  degreeChangeHandler = (e) => {
    var newEducationDetails = this.state.newEducationDetails;
    newEducationDetails.degree = e.target.value;
    this.setState({ newEducationDetails: newEducationDetails});
  }

  majorChangeHandler = (e) => {
    var newEducationDetails = this.state.newEducationDetails;
    newEducationDetails.major = e.target.value;
    this.setState({ newEducationDetails: newEducationDetails});
  }

  yearofpassingChangeHandler = (e) => {
    var newEducationDetails = this.state.newEducationDetails;
    newEducationDetails.yearofpassing = e.target.value;
    this.setState({ newEducationDetails: newEducationDetails});
  }

  cgpaChangeHandler = (e) => {
    var newEducationDetails = this.state.newEducationDetails;
    newEducationDetails.cgpa = e.target.value;
    this.setState({ newEducationDetails: newEducationDetails});
  }

  dispatch = async (state) => {
    await this.props.fillStudentDetails(state)
    return this.props.studentDetails;
  }


  submitStudentDetails = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    this.state.studentDetails.studentEducation.push(this.state.newEducationDetails);
    const data = {details : this.state.studentDetails,
                  edit_education_details : true}
    console.log("Sending Data ", data,  axios.defaults.headers);
    axios.post(`${backendURL}/student/editdetails`, data)
      .then(response => {
        if (response.status === 200) {
          this.dispatch(this.state.studentDetails)
            .then(result => {
              this.setState({
                detailsSubmitted : true
              })
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
      <React.Fragment>
        <StudentNavbar/>
      <div className="col-md-offset-0">
           <div className="profile-content">
              <div className="col-md-offset-4">
                <h2>Add Education</h2>
                {/* <label>College Name</label>
                <input style={{width:"300px"}} onChange = {this.colgnameChangeHandler}value={this.state.colgname} 
                type="text" className="form-control" placeholder="College Name" /> */}
                <br />
                <select style={{width:"300px"}}  className="form-control"
                  onChangeCapture = {this.colgnameChangeHandler} value={this.state.colgname}>
                    <option>-----Choose your University-----</option>
                    <option>UCLA</option>
                    <option>Columbia University</option>
                    <option>Lincoln School</option>
                    <option>UC Berkley</option>
                    <option>Stanford University</option>
                </select>
                <br/>
                <label>Location</label>
                <input style={{width:"300px"}} onChange = {this.locationChangeHandler}value={this.state.location} 
                type="text" className="form-control" placeholder="Location" />
                <br />
                <label>Degree</label>
                <input style={{width:"300px"}} onChange = {this.degreeChangeHandler}value={this.state.degree} 
                type="text" className="form-control" placeholder="Degree" />
                <br />
                {/* <label>Major</label>
                <input style={{width:"300px"}} onChange = {this.majorChangeHandler}value={this.state.major} 
                type="text" className="form-control" placeholder="Major" />
                <br /> */}
                <div className="form-group">
                  <label>Major*</label>
                  <select className="form-control" style={{width:"300px"}} id="types" onChange = {this.majorChangeHandler} value={this.state.major}>
                  <option>--Select Major--</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Commerce">Commerce</option>
                  </select>
                </div>
                <label>Year of Passing</label>
                <input style={{width:"300px"}} onChange = {this.yearofpassingChangeHandler}value={this.state.yearofpassing} 
                type="text" className="form-control" placeholder="Year of Passing" />
                <br />
                <label>CGPA</label>
                <input style={{width:"300px"}} onChange = {this.cgpaChangeHandler}value={this.state.cgpa} 
                type="text" className="form-control" placeholder="CGPA" />
                <br />
              <button type="button" onClick={this.submitStudentDetails} className="btn btn-success">Save</button>    
            </div>
          </div>
        </div>
      </React.Fragment> 
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
    fillStudentDetails : (details) => dispatch(fillStudentDetails(details))
  }
}

// export default EditEducationdetails;
export default connect(mapStateToProps, mapDispatchToProps)(AddEducationDetails);
