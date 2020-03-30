import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { fillBothDetails } from "../../common_store/actions/index";

const initialState={
  listStudentsRegistered : null,
}

class EventResultPage extends Component {

  constructor(props){
    super(props);
    this.state=initialState;
    this.searchedEvents = this.searchedEvents.bind(this);
    this.getRegisteredStudentDetails = this.getRegisteredStudentDetails.bind(this);
    this.studentsRegistered = this.studentsRegistered.bind(this);
    this.redirectStudentProfile = this.redirectStudentProfile.bind(this);
  }

  componentWillMount() {
    this.setState(initialState);

  }

  componentWillReceiveProps() {
    this.setState(initialState);
  }

  getRegisteredStudentDetails = (e) => {
    e.preventDefault();
    const data = {
      eventId : e.target.value,
    };
    axios.defaults.withCredentials = true;
    console.log("Sending Data "+ JSON.stringify(data));
    axios.post('http://localhost:3001/events/studentsregistered',data)
      .then(response => {
        console.log("Result student search :", response.data)
        this.setState({
          listStudentsRegistered : response.data,
        });
    });
  }


  searchedEvents = () => {
      if (this.state.listStudentsRegistered) {
        return <div></div>
      }
      const events = this.props.eventDetails.map((event, index) => {
         return ( 
                <div key={event.eventId}>
                <div><h2>{event.eventTitle}</h2></div>
                <p>
                  {/* {event.companyname}, */}
                &nbsp;{event.eventLocation},
                &nbsp;{event.eventDate},
                &nbsp;{event.eventDetail},
                &nbsp;<button type="submit" 
                value={event.eventId} onClick={this.getRegisteredStudentDetails}>
                Details
                </button></p>
                </div>
           );
     });
     return events;
  }

  redirectStudentProfile = (e) => {
    const data ={
      username : e.target.value,
      editmode : false
    };
    console.log("Data being sent is"+JSON.stringify(data));
    axios.post('http://localhost:3001/studentsignin', data)
      .then(response=>{
        console.log("Entered inside axios post req", response);
        if(response.data.details){
          const newStudentDetails={...response.data.details,
              editmode : false
          }
          const bothDetails = {studentDetails : newStudentDetails, employerDetails : this.props.employerDetails};
          this.props.fillBothDetails(bothDetails);
        }
      })
  }

  studentsRegistered = () => {
    if (!this.state.listStudentsRegistered) {
      return <div></div>
    } 

    const students = this.state.listStudentsRegistered.map((item, index) => {
      return ( 
        <div key={item.username}>
            <div className = "">
              <button variant="secondary" type="submit" 
               value = {item.username} style={{width:'100px'}} onClick={this.redirectStudentProfile}><i className='glyphicon glyphicon-user'/>
               &nbsp;{item.username}'s Profile
              </button>
            </div>
        </div>
      );
    });
    return students;
  }


  render() {
    let redirectVar = null;
    if (this.props.studentDetails) {
      redirectVar = <Redirect to = '/studentprofilepage' />
    }
    return(
      <React.Fragment>
        {redirectVar}
        <div className="container" />
        <div className="login-form" />
        <div className="panel" />
        <div className="row-container">{this.searchedEvents()}</div>
        <div className="row-container">{this.studentsRegistered()}</div>
      </React.Fragment> 
    )
  }    
}

function mapStateToProps(state) {
  return {
    employerDetails : state.employerDetails,
    studentDetails : state.studentDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillBothDetails : (details) => dispatch(fillBothDetails(details))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventResultPage);
