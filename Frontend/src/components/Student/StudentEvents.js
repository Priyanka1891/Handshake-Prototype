import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import axios from 'axios';
import ListEvent from './ListEvent';
import {connect} from 'react-redux';
import { fillEventDetailsList } from '../../common_store/actions/event'
import { backendURL } from   "../../Utils/config"


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
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
  
    today = yyyy + '-' + mm + '-' + dd;
  
    const data = {isStudent : true};
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendURL}/events/list`,data)
      .then(response => {
        let upcomingEventList = [];
        for(let idx=0;idx<response.data.length;idx++){
          if(response.data[idx].date.localeCompare(today)>0){
            upcomingEventList.push(response.data[idx]);
          }
        }
        this.props.fillEventDetailsList(upcomingEventList);
        this.setState({
          allEventsBool : true,
          filterEventsBool : false,
          registeredEventsBool : false,
          events : upcomingEventList
        })
        // console.log(response.data);
        // console.log(typeof response.data[0].date,typeof today);
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
    this.props.fillEventDetailsList(searchedEvents);

    this.setState({
      allEventsBool : false,
      filterEventsBool : true,          
      registeredEventsBool : false,
      filteredEvents : searchedEvents
    });    
  }
  
  registeredEvents = (e) => {
    const data={username : this.props.studentDetails.username}
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendURL}/events/registeredstudenteventlist`,data)
      .then(response => {
        this.props.fillEventDetailsList(response.data);
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
                    <button className='btn btn-link'type='submit'onClick={this.registeredEvents}>Click to view registered Events</button>
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

function mapStateToProps(state) {
  return {
    studentDetails : state.login.studentDetails
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fillEventDetailsList : (details) => dispatch(fillEventDetailsList(details)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentEvents);
