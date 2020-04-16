import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import { backendURL } from   "../../Utils/config"


const initialState={
  eventPosted : false,
  eventTitle : '',
  eventDate : '',
  eventDetail : '',
  eventLocation : '',
  companyName : ''
}

class PostEvent extends Component{

  constructor(props){
      super(props);
      this.state= initialState;
      this.state.companyName = this.props.employerDetails.name;
      this.eventTitleChangeHandler = this.eventTitleChangeHandler.bind(this);
      this.eventDateChangeHandler = this.eventDateChangeHandler.bind(this);
      this.eventDetailChangeHandler = this.eventDetailChangeHandler.bind(this);
      this.eventLocationChangeHandler = this.eventLocationChangeHandler.bind(this);
      this.postEventDetails = this.postEventDetails.bind(this);
  }

  eventTitleChangeHandler = (e) => {
    this.setState({
      eventTitle : e.target.value
    })
  }

  eventDateChangeHandler = (e) => {
    this.setState({
      eventDate : e.target.value
    })
  }

  eventDetailChangeHandler = (e) => {
    this.setState({
      eventDetail : e.target.value
    })
  }

  eventLocationChangeHandler = (e) => {
    this.setState({
      eventLocation : e.target.value
    })
  }
  eligibilityChangeHandler = (e) => {
    this.setState({
      eligibility : e.target.value
    })
  }


  postEventDetails = (e) => {
    e.preventDefault();
    for (let [key, value] of Object.entries(this.state)) {
      if (key === 'eventPosted') continue;
      if (!value) {
        var msg;
        if (key === 'companyName') msg = 'Please login and try again...';
        else msg = 'Enter all required fields';
        window.alert(msg);
        return;
      }
    }

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = this.state;
    console.log("Sending Data ", data);
    axios.post(`${backendURL}/events/postevent`, data)
      .then(response => {
        console.log("Edit Response: ", response);
        if (response.status === 200) {
          this.setState({
            eventPosted : true
          });
          window.alert("Event posted successfully")
        }
    });
  }

  render() {
    let redirectVar = null;
    if (this.state.eventPosted) {
      redirectVar = <Redirect to="/employerevents" />
    }
    return(
      <div>
      {redirectVar}
      <br />
      <React.Fragment>
      <div className="col-md-offset-5">
              <div className="profile-content">
                <h2>Event Details</h2>
              <div className="form-group">
                <label>Event Title*</label>
                <input style={{width:"300px"}} onChange = {this.eventTitleChangeHandler}value={this.state.eventTitle} 
                type="text" className="form-control"  />
              </div>
              <div className="form-group">
                <label>Event Date*</label>
                <input style={{width:"300px"}} onChange = {this.eventDateChangeHandler}value={this.state.eventDate} 
                type="date" className="form-control"  />
              </div>
              <div className="form-group">
                <label>Event Detail*</label>
                <input  style={{width:"300px"}} onChange = {this.eventDetailChangeHandler}value={this.state.eventDetail} 
                type="text" className="form-control"  />
              </div>
              <div className="form-group">
                <label>Location*</label>
                <input style={{width:"300px"}} onChange = {this.eventLocationChangeHandler}value={this.state.eventLocation} 
                type="text" className="form-control" />
              </div>
              <div className="form-group">
                  <label>Eligibility*</label>
                  <select className="form-control" style={{width:"300px"}} id="types" onChange = {this.eligibilityChangeHandler} value={this.state.eligibility}>
                  <option>--Select Major--</option>
                    <option>All</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Data Analytics">Data Analytics</option>
                  </select>
              </div>
              <button type="button" onClick={this.postEventDetails} className="btn btn-success">Post Event</button>    
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

// export default PostEvent;
export default connect(mapStateToProps, null)(PostEvent);
