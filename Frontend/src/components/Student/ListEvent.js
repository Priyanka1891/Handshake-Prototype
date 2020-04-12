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
    // console.log("Here",  (target));
    // if (target.title.toLowerCase().includes('hardware')) {
    //   window.alert('Sorry, not eligible to apply for event');
    //   return;
    // }
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
    // console.log("Inside list event ",this.props.eventDetails);
      const events = this.props.eventDetails.map((event, index) => {
         return ( 
          //  <div key={event._id}>
          <React.Fragment>
              <tr>
              <th scope="row" className="text-center">{event.title}</th>
               <td>{event.date}</td>
               <td>{event.detail}</td>
               <td>{event.location}</td>
               <td>{event.createdby}</td>
                {/* {event.createdby && event.username?(<div></div>):(<button type="submit" value={JSON.stringify({id: event.eventId, title : event.eventTitle})} onClick={this.registerEvents}>
                 Register
                </button>)}  */}
              </tr>
           </React.Fragment>
          );
      });
     return events;
  }

  render() {
    return(
      <React.Fragment>
        <div><h2 style={{align:'center'}}>Event List :</h2></div>
        <br />
        <table className="table table-borderless table-hover">
         <thead className="thead-dark">
          <tr>
            <th className="text-center">Title</th>
            <th className="text-center">Date</th>
            <th className="text-center">Detail</th>
            <th className="text-center">Location</th>
            <th className="text-center">Organised By</th>
          </tr>
          </thead>
          <tbody>
            {this.listEvents()}
          </tbody>
        </table>
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


