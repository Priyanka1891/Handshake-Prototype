import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

const initialState={
  username : null,
  eventId : null,
}
class ListEvent extends Component {

  constructor(props){
    super(props);
    this.state=initialState;
    this.registerEvents = this.registerEvents.bind(this);
    this.listEvents = this.listEvents.bind(this);
  }

  registerEvents = (e) => {
    e.preventDefault();
    var target = JSON.parse(e.target.value);
    const data = {
      eventId : target.id,
      username : this.props.studentDetails.username
    };
    console.log("Here",  (target));
    if (target.title.toLowerCase().includes('hardware')) {
      window.alert('Sorry, not eligible to apply for event');
      return;
    }
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data "+ JSON.stringify(data));
    axios.post('http://localhost:3001/events/registerstudentevent',data)
      .then(response => {
        console.log("Entered inside axios post req");
        if(response.data){
          window.alert("Event registered successfully");
        }
    });
  }

  listEvents(){
      const events = this.props.eventDetails.map((event, index) => {
         return ( 
           <div key={event.eventId}>
             <div>
               <h2>{event.eventTitle}</h2>
               {event.eventLocation}
               ,
               &nbsp;
               {event.eventDetail}
               ,
               &nbsp;
               {event.eventDate}&nbsp;
                {event.companyname && event.username?(<div></div>):(<button type="submit" value={JSON.stringify({id: event.eventId, title : event.eventTitle})} onClick={this.registerEvents}>
                 Register
                </button>)} 
             </div>
             <br />
           </div> 
          );
      });
     return events;
  }

  render() {
    return(
      <React.Fragment>
        <div className="container" />
        <div className="login-form" />
        <div className="panel" />
        <div><h2 style={{align:'center'}}>Events List</h2></div>
        <br />
        <div className="row-container">{this.listEvents()}</div>
      </React.Fragment> 
    )
  }    
}

function mapStateToProps(state) {
  return {
    studentDetails : state.studentDetails
  }
}
export default connect(mapStateToProps, null)(ListEvent);


