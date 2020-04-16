import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { backendURL } from   "../../Utils/config"


const initialState={
  cancelevent : false
}

class ViewEventDetails extends Component {
  constructor(props){
    super(props);
    this.state=initialState;
    this.registerEvent = this.registerEvent.bind(this);
    this.cancelEvent = this.cancelEvent.bind(this);
  }
  registerEvent = (e) => {
    e.preventDefault();
    let index=0;
    for( let idx=0;idx<this.props.studentDetails.studentEducation.length;idx++){
      // console.log("Here",this.props.studentDetails.studentEducation[0].major.toLowerCase());
      // console.log("And here",this.props.location.state.detail.toLowerCase());
  
      if(this.props.studentDetails.studentEducation[idx].major.toLowerCase().includes(this.props.location.state.eligibility.toLowerCase())){
        index=1;
        break;
      }
    }
    if(index || this.props.location.state.eligibility==="All"){
        const data = {
        eventId : this.props.location.state._id,
        username : this.props.studentDetails.username,
        };
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      console.log("Sending Data "+ JSON.stringify(data));
      axios.post(`${backendURL}/events/listregisteredstudent`,data)
        .then(response => {
          console.log("Entered inside axios post req");
          if(response.data){
            console.log("Here");
            window.alert(response.data);
          }
        });
    }
    else{
      window.alert("Not eligible to apply for event");
    }
  }

  cancelEvent=()=>{
    this.setState({
      cancelevent : true
    })
  }

  render() {
    let redirectVar = null;
    if (this.state.cancelevent) {
      redirectVar = <Redirect to='/studentevents' />
    }    

      return(
        <React.Fragment>
          {redirectVar}
        <StudentNavbar/>
        <div className="container">
          <h2>{this.props.location.state.title}</h2>
          <br />
          <div className="card">
           <div className="card-body">
            <label htmlFor="usr">Date :&nbsp;&nbsp;&nbsp;{this.props.location.state.date}</label>
            <label htmlFor="usr">Detail :&nbsp;&nbsp;&nbsp;{this.props.location.state.detail}</label>
            <label htmlFor="usr">Location :&nbsp;&nbsp;&nbsp;{this.props.location.state.location}</label>
            <label htmlFor="usr">Company Name :&nbsp;&nbsp;&nbsp;{this.props.location.state.createdby}</label>
            <label htmlFor="usr">Eligibility :&nbsp;&nbsp;&nbsp;{this.props.location.state.eligibility}</label>
            <br/>
            <br/>
              <button type="button" className="btn btn-success" onClick={this.registerEvent}>Register</button>
            <button type="button"onClick={this.cancelEvent}className="btn btn-danger">Cancel</button>  
           </div>
          </div>
          <br/>
          <br/>
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
export default connect(mapStateToProps, null)(ViewEventDetails);


