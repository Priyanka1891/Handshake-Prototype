import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

const initialState={
  editDetails : false,
}

class Details extends Component{

  constructor(props) {
    super(props);
    this.state = initialState;
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
                  &nbsp;&nbsp;{this.props.studentDetails.editmode?(<button onClick={this.editStudentDetails} type="button" className="btn btn-default btn-sm">
                  <span className="glyphicon glyphicon-pencil"></span>
                  </button>):(<div></div>)} 
                </h2> 
                {/* </ul> */}
                <label>Name : &nbsp;{this.props.studentDetails.basicDetails ?
                this.props.studentDetails.basicDetails.name : null}</label>
                <br />
                <label>Date Of Birth :&nbsp;{this.props.studentDetails.basicDetails ?
                  this.props.studentDetails.basicDetails.dob : null}</label>
                <br />
                <label>City :&nbsp;{this.props.studentDetails.basicDetails ?
                this.props.studentDetails.basicDetails.city : null}</label>
                <br />
                <label>State :&nbsp;{this.props.studentDetails.basicDetails ?
                this.props.studentDetails.basicDetails.state : null }</label>
                <br />
                <label>Country :&nbsp;{this.props.studentDetails.basicDetails ?
                this.props.studentDetails.basicDetails.country : null}</label>
                <br/>
                <label>Contact No :&nbsp;{this.props.studentDetails.basicDetails ?
                this.props.studentDetails.basicDetails.contactno : null}</label>
                <br/>
                <label>Email:&nbsp;{this.props.studentDetails.email ?
                this.props.studentDetails.email : null}</label>
                <br/>
                <label>Skills :&nbsp;{this.props.studentDetails.basicDetails?
                this.props.studentDetails.basicDetails.skills : null}</label>
                <br/>
                <label>Objective :&nbsp;{this.props.studentDetails.basicDetails ?
                this.props.studentDetails.basicDetails.objective : null}</label>
                {/* <br /> */}
        </div>
        ) 
    }
}

function mapStateToProps(state) {
  return {
    studentDetails : state.login.studentDetails,
  }
}

// export default Details;
export default connect(mapStateToProps, null)(Details);
