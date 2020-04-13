import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import axios from 'axios';
import ListEvent from './ListEvent';
import {connect} from 'react-redux';

const initialState={
  eventQuery : '',
  allEventsBool : false,
  filterEventsBool : false,
  registeredEventsBool : false,
  events : null,
  regEvents : null,
  filteredEvents : null,
  registeredEvents : null
}

class StudentEvents extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount = () => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post('http://localhost:3001/events/list')
      .then(response => {
        this.setState({
          allEventsBool : true,
          filterEventsBool : false,
          registeredEventsBool : false,
          events : response.data
        })
    });
  }

  eventQueryChangeHandler = (e) => {
    this.setState({
      eventQuery : e.target.value
    });
  }

  listSearchedEvents = () => {
    let searchedEvents = [];
    for (let idx = 0; idx < this.state.events.length; ++idx) {
      if (this.state.events[idx].title.toLowerCase().includes(
        this.state.eventQuery.toLowerCase())) {
        searchedEvents.push(this.state.events[idx]);
      }
    }
    this.setState({
      allEventsBool : false,
      filterEventsBool : true,          
      registeredEventsBool : false,
      filteredEvents : searchedEvents
    });
  }
  
  registeredEvents = (e) => {
    const data={username : this.props.studentDetails.username}//._id
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post('http://localhost:3001/events/listregisteredstudent',data)
      .then(response => {
        // console.log("Result event query :", JSON.stringify(response.data))
        this.setState({
          allEventsBool : false,
          filterEventsBool : false,
          registeredEventsBool : true,
          regEvents : response.data
        })
    });
    // console.log("Entered here both values " , this.state.events);
    // for (let idx = 0; idx < this.state.events.length; ++idx) {
    //   if (this.props.studentDetails.username === this.state.events[idx].username) {
    //     this.state.regEvents.push(this.state.events[idx]);
    //   }
    // }
    // console.log("username:", this.props.studentDetails.username, " Reg events:", this.state.regEvents);
    // this.setState({
    //   allEventsBool : false,
    //   filterEventsBool : false,
    //   registeredEventsBool : true,
    //   registeredEvents : this.events
    // });
  }

  render() {
    let eventResult = null;
    if (this.state.allEventsBool) {
      eventResult = (<ListEvent eventDetails = {this.state.events}></ListEvent>)
    } else if (this.state.filterEventsBool) {
      eventResult = (<ListEvent eventDetails = {this.state.filteredEvents}></ListEvent>)
    } else if (this.state.registeredEventsBool) {
      eventResult = (<ListEvent eventDetails = {this.state.regEvents}></ListEvent>)
    }
    return(
      <React.Fragment>
        <StudentNavbar />
        <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="http://code.jquery.com/jquery-1.11.1.min.js" />
        <link rel="stylesheet" href="style.css"  />
        <div className="container">
            <div className="login-form">
                <div className="panel">
                  <div>
                    <label>Event Search:</label>
                    <br />
                    <input onChange = {this.eventQueryChangeHandler} type ='text' style={{width:'70%'}} placeholder="Enter Event Name to Search"/>&nbsp;&nbsp;
                    <button type='submit'onClick={this.listSearchedEvents}><i className="fa fa-search"></i></button>
                    <br /><br />
                    <button type='submit'onClick={this.registeredEvents}>Registered Events</button>
                    <br />
                    <br />
                    {eventResult}
                  </div>
                </div>
            </div>
        </div>
          </React.Fragment> 
    )
  }
}

// export StudentEvents Component
function mapStateToProps(state) {
  return {
    studentDetails : state.studentDetails
  }
}

export default connect(mapStateToProps, null)(StudentEvents);
