import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

const initialState={
  editExperienceDetails : false
}

class Experience extends Component{
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  editStudentDetails = (e) =>{
    this.setState({
      editExperienceDetails : true
    })
  }

  render(){
      let redirectVar = null;
      if (this.state.editExperienceDetails) {
        redirectVar = <Redirect to="/editexperiencedetails" />
      }

      return(
        <div>
        {redirectVar}
          <br />
        <React.Fragment>
          <div className="container">
            <div className="login-form">
              <div className="main-div">
                <div className="panel">
                  <h2>Experience Overview</h2>
                </div>
                <div className="form-group">
                  <label>Company Name: </label>
                &nbsp;
                  <label>{this.props.studentDetails.companyname}</label>
                </div>
                <div className="form-group">
                  <label>Job Title: </label>
                  <label>{this.props.studentDetails.title}</label>
                </div>
                <div className="form-group">
                  <label>Company Location:</label>
                &nbsp;
                  <label>{this.props.studentDetails.companylocation}</label>
                </div>
                <div className="form-group">
                  <label>Start Date:</label>
                &nbsp;
                  <label>{this.props.studentDetails.startdate}</label>
                </div>
                <div className="form-group">
                  <label>End Date:</label>
                &nbsp;
                  <label>{this.props.studentDetails.enddate}</label>
                </div>
                <div className="form-group">
                  <label>Job Details:</label>
                &nbsp;
                  <label>{this.props.studentDetails.jobdetails}</label>
                </div>
                <div className="form-group">
                  <label>Skills:</label>
                &nbsp;
                  <label>{this.props.studentDetails.skills}</label>
                </div>
                <div>
                  {this.props.studentDetails.editmode?(<button type="button" onClick={this.editStudentDetails} className="btn btn-default btn-sm">                <span class="glyphicon glyphicon-pencil"></span>
                  </button>) :(<div></div>)} 
                </div>           
              </div>
            </div>
          </div>
        </React.Fragment>
        </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    studentDetails : state.studentDetails
  }
}

// export Experience Component  
export default connect(mapStateToProps, null)(Experience);