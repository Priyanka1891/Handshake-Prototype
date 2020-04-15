import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';


const initialState={
  cancelevent : false
}

class ViewEventDetails extends Component {
  constructor(props){
    super(props);
    this.state=initialState;
    this.registerEvent = this.applyJob.bind(this);
    this.cancelEvent = this.cancelJob.bind(this);
  }
  registerEvent = (e) => {
    e.preventDefault();
    var target = JSON.parse(e.target.value);
    const data = {
      eventId : this.props.location.state._id,
      username : this.props.studentDetails.username,
      major : this.props.studentDetails.studentEducation.major
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data "+ JSON.stringify(data));
    axios.post('http://localhost:3001/events/registerstudentevent',data)
      .then(response => {
        console.log("Entered inside axios post req");
        if(response.data){
          window.alert(response.data);
        }
    });
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
        <div class="container">
          <h2>{this.props.location.state.title}</h2>
          <br />
          <div class="card">
           <div class="card-body">
            <label for="usr">Date :&nbsp;&nbsp;&nbsp;{this.props.location.state.date}</label>
            <label for="usr">Detail :&nbsp;&nbsp;&nbsp;{this.props.location.state.detail}</label>
            <label for="usr">Location :&nbsp;&nbsp;&nbsp;{this.props.location.state.location}</label>
            <label for="usr">Company Name :&nbsp;&nbsp;&nbsp;{this.props.location.state.createdby}</label>
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


