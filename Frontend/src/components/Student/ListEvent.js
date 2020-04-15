import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

const initialState={
  username : null,
  eventId : null,
  viewevent : null
}
class ListEvent extends Component {

  constructor(props){
    super(props);
    this.state=initialState;
    // this.registerEvents = this.registerEvents.bind(this);
    this.listEvents = this.listEvents.bind(this);
    this.viewEvent = this.viewEvent.bind(this);
  }


  viewEvent = (e) => {
    let eventdetails={};
    // console.log("Reached here with eventDetails as",this.props.eventDetails);
    for(let idx=0;idx<this.props.eventDetails.length;idx++){
      if(e.target.value===this.props.eventDetails[idx]._id){
        eventdetails=this.props.eventDetails[idx];
      }
    }
    this.setState({
      viewevent : eventdetails
    })    
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
               <td><button onClick = {this.viewEvent}type="submit" className = "btn btn-link" value={event._id}>View</button></td>
              </tr>
           </React.Fragment>
          );
      });
     return events;
  }

  render() {
    let redirectVar = null;
    if (this.state.viewevent) {
      redirectVar = <Redirect to={{pathname : '/vieweventdetails',state: this.state.viewevent} }/>
    }  //console.log(this.props.eventDetails);  

    return(
      <React.Fragment>
        {redirectVar}
        {this.props.eventDetails.length?<div>
        <div><h2 style={{align:'center'}}>Upcoming event List :</h2></div>
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
        </div>:<div></div>
        }
      </React.Fragment> 
    )
  }    
}

function mapStateToProps(state) {
  return {
    studentDetails : state.login.studentDetails
  }
}
export default connect(mapStateToProps, null)(ListEvent);


