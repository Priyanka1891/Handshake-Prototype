import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

const initialState={
  editDetails : false,
  currentStudentDetails : null
}

class Details extends Component{

  constructor(props) {
    super(props);
    this.state = initialState;
    this.state.currentStudentDetails =
      this.props.otherStudentDetails ? this.props.otherStudentDetails : this.props.studentDetails;
  }

  editStudentDetails = (e) =>{
    this.setState({
      editDetails : true
    });
  }

  render(){
      let redirectVar = null;
      if (this.state.editDetails) {
        redirectVar = <Redirect to="/editdetails" />
      }

      return(
        <div>
        {redirectVar}
          <br />
                <h2>Profile Overview
                {/* <ul class="nav navbar-nav navbar-right"> */}
                  &nbsp;&nbsp;{this.state.currentStudentDetails.editmode?(<button onClick={this.editStudentDetails} type="button" className="btn btn-default btn-sm">
                  <span className="glyphicon glyphicon-pencil"></span>
                  </button>):(<div></div>)} 
                </h2> 
                {/* </ul> */}
                <label>Name : &nbsp;{this.state.currentStudentDetails.basicDetails ?
                this.state.currentStudentDetails.basicDetails.name : null}</label>
                <br />
                <label>Date Of Birth :&nbsp;{this.state.currentStudentDetails.basicDetails ?
                  this.state.currentStudentDetails.basicDetails.dob : null}</label>
                <br />
                <label>City :&nbsp;{this.state.currentStudentDetails.basicDetails ?
                this.state.currentStudentDetails.basicDetails.city : null}</label>
                <br />
                <label>State :&nbsp;{this.state.currentStudentDetails.basicDetails ?
                this.state.currentStudentDetails.basicDetails.state : null }</label>
                <br />
                <label>Country :&nbsp;{this.state.currentStudentDetails.basicDetails ?
                this.state.currentStudentDetails.basicDetails.country : null}</label>
                <br/>
                <label>Contact No :&nbsp;{this.state.currentStudentDetails.basicDetails ?
                this.state.currentStudentDetails.basicDetails.contactno : null}</label>
                <br/>
                <label>Email:&nbsp;{this.state.currentStudentDetails.email ?
                this.state.currentStudentDetails.email : null}</label>
                <br/>
                <label>Skills :&nbsp;{this.state.currentStudentDetails.basicDetails?
                this.state.currentStudentDetails.basicDetails.skills : null}</label>
                <br/>
                <label>Objective :&nbsp;{this.state.currentStudentDetails.basicDetails ?
                this.state.currentStudentDetails.basicDetails.objective : null}</label>
                {/* <br /> */}
        </div>
        ) 
    }
}

function mapStateToProps(state) {
  return {
    studentDetails : state.login.studentDetails,
    otherStudentDetails : state.login.otherStudentDetails
  }
}

// export default Details;
export default connect(mapStateToProps, null)(Details);
