import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Row, Col, Pagination} from 'react-bootstrap';

const initialState={
  username : null,
  eventId : null,
  viewevent : null,
  activePage: 1
}
class ListEvent extends Component {

  constructor(props){
    super(props);
    this.state=initialState;
    // this.registerEvents = this.registerEvents.bind(this);
    // this.listEvents = this.listEvents.bind(this);
    this.viewEvent = this.viewEvent.bind(this);
  }

  changePage = (e) => {
    let page = this.state.activePage;
    if (e.target.text === ">" && page !== parseInt(e.target.name, 10)) {
        page += 1;
    } else if (e.target.text === "<" && page !== parseInt(e.target.name, 10)) {
        page -= 1;
    } else {
        page = parseInt(e.target.name, 10);
    }
    this.setState({
        activePage: page
    });
  };  

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


  // listEvents(){
  //   // console.log("Inside list event ",this.props.eventDetails);

  //     const events = this.props.eventDetails.map((event, index) => {
  //        return ( 
  //         //  <div key={event._id}>
  //         <React.Fragment>
  //             <tr>
  //             <th scope="row" className="text-center">{event.title}</th>
  //              <td>{event.date}</td>
  //              <td>{event.detail}</td>
  //              <td>{event.location}</td>
  //              <td>{event.createdby}</td>
  //              <td><button onClick = {this.viewEvent}type="submit" className = "btn btn-link" value={event._id}>View</button></td>
  //             </tr>
  //          </React.Fragment>
  //         );
  //     });
  //    return events;
  // }

  sectionItems (eventDetails) {
    return (
      <tr>
      <th scope="row" className="text-center">{eventDetails.title}</th>
       <td>{eventDetails.date}</td>
       <td>{eventDetails.detail}</td>
       <td>{eventDetails.location}</td>
       <td>{eventDetails.createdby}</td>
       <td><button onClick = {this.viewEvent}type="submit" className = "btn btn-link" value={eventDetails._id}>View</button></td>
      </tr>
    )
  }

  render() {
    let redirectVar = null,
            section,
            active = 1,
            itemsToShow = 2,
            pagesBar = null,
            renderOutput = [];

    if (this.state.viewevent) {
      redirectVar = <Redirect to={{pathname : '/vieweventdetails',state: this.state.viewevent} }/>
    }  

    if (this.state && this.state.activePage) {
      active = this.state.activePage;
    }

    if (this.props.eventDetails && this.props.eventDetails.length > 0) {
      let sectionCount = 0;
      for (var i = (active - 1) * itemsToShow; i < this.props.eventDetails.length; i++) {
          section = this.sectionItems(this.props.eventDetails[i]);
          renderOutput.push(section);
          if (++sectionCount === itemsToShow)
              break;
      }

      let pages = [];
      let pageCount = Math.ceil(this.props.eventDetails.length / itemsToShow);

      for (let i = 1; i <= pageCount; i++) {
          pages.push(
              <Pagination.Item active={i === active} name={i} key={i} onClick={this.changePage}>
                  {i}
              </Pagination.Item>
          );
      }
      pagesBar = (
          <div>
              <br />
              <Pagination>
                  <Pagination.Prev name="1" onClick={this.changePage} />
                  {pages}
                  <Pagination.Next name={pageCount} onClick={this.changePage} />
              </Pagination>
          </div>
      );
    }
    
    return(
      <React.Fragment>
        {redirectVar}
        {this.props.eventDetails.length?(<div>
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
          {renderOutput}
          <Row>
                <Col sm={4}></Col>
                <Col>{pagesBar}</Col>
          </Row>
          {/* <tbody>
            {this.listEvents()}
          </tbody> */}
        </table>
        </div>):(<div></div>)
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


