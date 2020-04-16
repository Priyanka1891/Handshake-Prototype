import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { fillBothDetails } from "../../common_store/actions/login";
import { backendURL } from   "../../Utils/config"


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
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data "+ JSON.stringify(data));
    axios.post(`${backendURL}/events/registeredstudentlist`,data)
      .then(response => {
        console.log("Result student search :", response.data)
        this.setState({
          listStudentsRegistered : response.data,
        });
    });
    // console.log("Result student search :", this.state.listStudentsRegistered)
  }


  searchedEvents = () => {
      if (this.state.listStudentsRegistered) {
        return <div></div>
      }
      const events = this.props.eventDetails.map((event, index) => {
         return ( 
                // <div key={event._id}>
                <React.Fragment>
                <tr>
                  <th scope="row" className="text-center">{event.title}</th>
                  <td>{event.date}</td>
                  <td>{event.detail}</td>
                  <td>{event.location}</td>
                  <td><button type="submit" className="btn btn-link"
                      value={event._id} onClick={this.getRegisteredStudentDetails}>
                      Details
                    </button></td>
                </tr>
                </React.Fragment>
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
    axios.post(`${backendURL}/student/signin`, data)
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
    console.log("Here list",this.state.listStudentsRegistered);
    const students = this.state.listStudentsRegistered.studentsregistered.map((item, index) => {
      return ( 
                // <div key={item.username}>

        <React.Fragment>
        {item.username?<div>
              <label htmlFor="usr"><b>Students Registered</b></label>
              <br />
              <br />
              <h2>{item.username}</h2>
              <button  type="submit" className="btn btn-link"
               value = {item.username}  onClick={this.redirectStudentProfile}>
               Click to view Profile
              </button>
        </div>:<div></div>}
        </React.Fragment>
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
        <br/>
        {redirectVar}{!this.state.listStudentsRegistered?
        <div><h2 style={{align:'center'}}>Event List :</h2>
        <br />
        <table className="table table-borderless table-hover">
         <thead className="thead-dark">
          <tr>
            <th className="text-center">Title</th>
            <th className="text-center">Date</th>
            <th className="text-center">Detail</th>
            <th className="text-center">Location</th>
          </tr>
          </thead>
          <tbody>
            {this.searchedEvents()}
          </tbody>
        </table>      
        </div>:<div></div>}
        <br/>
        <div className="row-container">{this.studentsRegistered()}</div>
      </React.Fragment> 
    )
  }    
}

function mapStateToProps(state) {
  return {
    employerDetails : state.login.employerDetails,
    studentDetails : state.login.studentDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillBothDetails : (details) => dispatch(fillBothDetails(details))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventResultPage);
