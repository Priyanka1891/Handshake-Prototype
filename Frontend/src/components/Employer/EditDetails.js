import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import { fillEmployerDetails } from "../../common_store/actions/login";
import { backendURL } from   "../../Utils/config"

const initialState={
  detailsSubmitted : false,
  employerDetails : {}
}

class EditEmployerDetails extends Component{

  constructor(props){
      super(props);      
      this.state = initialState;
      this.state.employerDetails = this.props.employerDetails;
      this.nameChangeHandler = this.nameChangeHandler.bind(this);
      this.locationChangeHandler = this.locationChangeHandler.bind(this);
      this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
      this.contactNoChangeHandler = this.contactNoChangeHandler.bind(this);
      this.submitEmployerDetails = this.submitEmployerDetails.bind(this);
  }

  nameChangeHandler = (e) => {
    var employerDetails = {...this.state.employerDetails}
    employerDetails.name = e.target.value;
    this.setState({employerDetails})
  }

  locationChangeHandler = (e) => {
    var employerDetails = {...this.state.employerDetails}
    employerDetails.location = e.target.value;
    this.setState({employerDetails})
  }

  descriptionChangeHandler = (e) => {
    var employerDetails = {...this.state.employerDetails}
    employerDetails.description = e.target.value;
    this.setState({employerDetails})
  }

  contactNoChangeHandler = (e) => {
    var employerDetails = {...this.state.employerDetails}
    employerDetails.contactno= e.target.value;
    this.setState({employerDetails})
  }

  dispatch = async (state) => {
    await this.props.fillEmployerDetails(state)
    return this.props.employerDetails;
  }

  submitEmployerDetails = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data ", this.state.employerDetails);
    const data = {details : this.state.employerDetails , edit_details : true}
    axios.post(`${backendURL}/employer/editdetails`, data)
      .then(response => {
        console.log("Edit Response: ", response);
        if (response.status === 200) {
          this.dispatch(this.state.employerDetails)
            .then(result => {
              this.setState({
                detailsSubmitted : true
              })
             console.log("Edited details: ", result);
            })
        }
    });
  }

  render() {
    let redirectVar = null;
    if (this.state.detailsSubmitted) {
      redirectVar = <Redirect to="/employerprofilepage" />
    }
    return(
      <div>
      {redirectVar}
        <br />
      <React.Fragment>
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Profile Overview</h2>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input onChange = {this.nameChangeHandler}value={this.state.name} placeholder={this.props.employerDetails.name}
                type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input onChange = {this.locationChangeHandler}value={this.state.location} placeholder={this.props.employerDetails.location}
                type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input onChange = {this.descriptionChangeHandler}value={this.state.description} placeholder={this.props.employerDetails.description}
                type="text" className="form-control"/>
              </div>
              <div className="form-group">
                <label>Contact No.</label>
                <input onChange = {this.contactNoChangeHandler}value={this.state.contactno} placeholder={this.props.employerDetails.contactno} 
                type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required className="form-control" />
              </div>
              <button type="button" onClick={this.submitEmployerDetails} className="btn btn-primary">Save</button>    
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
    employerDetails : state.login.employerDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillEmployerDetails : (details) => dispatch(fillEmployerDetails(details))
  }
}

// export default EditEmployerDetails;
export default connect(mapStateToProps, mapDispatchToProps)(EditEmployerDetails);
