import React, {Component} from 'react';
import EmployerNavbar from './EmployerNavbar';
import axios from 'axios';
import {connect} from 'react-redux';
import EventResultPage from './EventResultPage';
import {Redirect} from 'react-router';
import { fillBothDetails } from "../../common_store/actions/login";
import { fillEventDetailsList } from '../../common_store/actions/event'
import { backendURL } from   "../../Utils/config"



const initialState={
  postNewEvent : false,
  eventQuery : null,
  eventsList : null,
}

class EmployerEvents extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.listEventResults = this.listEventResults.bind(this);
    this.postEvent = this.postEvent.bind(this);
  }


  listEventResults = (e) => {
    e.preventDefault();
    var payload = {studentDetails : null , employerDetails : this.props.employerDetails};
    this.props.fillBothDetails(payload);
    const data = {
      eventQuery : this.props.employerDetails.name,
      isStudent : false
    };
    if (!this.props.employerDetails.name) {
      window.alert('Please login and try again..');
      return;
    }
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data "+ JSON.stringify(data));
    axios.post(`${backendURL}/events/list`, data)
      .then(response => {
        console.log("Event lists:", response);
        this.props.fillEventDetailsList(response.data);
        this.setState({
          eventsList : response.data
        });
    });
  }
  
  postEvent = (e) => {
    e.preventDefault();
    var payload = {studentDetails : null , employerDetails : this.props.employerDetails};
    this.props.fillBothDetails(payload);
    this.setState({
      postNewEvent : true
    })
  }

  render() {
    let resultPage = null;
    resultPage = this.state.eventsList ? (<EventResultPage eventDetails = {this.state.eventsList}></EventResultPage>) : null;

    let redirectVar = null;
    if (this.state.postNewEvent) {
      redirectVar = <Redirect to = "/postevent" />
    }

    return(
      <React.Fragment>
        {redirectVar}
        <EmployerNavbar />
        <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="http://code.jquery.com/jquery-1.11.1.min.js" />
        <link rel="stylesheet" href="style.css"  />
        <div className="container">
          <div className="login-form">
              <div className="panel">
                  <br />
                  <button className="btn btn-success"type='submit'onClick={this.postEvent}>Post Event</button>
                  <br />
                  <br />
                  <button className ="btn btn-success"type='submit'onClick={this.listEventResults}>List Events</button>
                  <br />
                {resultPage}
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
    fillBothDetails : (details) => dispatch(fillBothDetails(details)),
    fillEventDetailsList : (details) => dispatch(fillEventDetailsList(details))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerEvents);