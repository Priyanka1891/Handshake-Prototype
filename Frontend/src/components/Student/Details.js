import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

const initialState={
  editDetails : false
}

class Details extends Component{

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  editStudentDetails = (e) =>{
    this.setState({
      editDetails : true
    })
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
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Profile Overview</h2>
                {/* <ul class="nav navbar-nav navbar-right">
                <span onClick = {this.editStudentDetails} className="glyphicon glyphicon-pencil"></span>
                </ul> */}
              </div>
              <div className="form-group">
                <label>Name: </label>
                &nbsp;
                <label>{this.props.studentDetails.name}</label>
              </div>
              <div className="form-group">
                <label>Date Of Birth: </label>
                <label>{this.props.studentDetails.dob}</label>
              </div>
              <div className="form-group">
                <label>City:</label>
                &nbsp;
                <label>{this.props.studentDetails.city}</label>
              </div>
              <div className="form-group">
                <label>State:</label>
                &nbsp;
                <label>{this.props.studentDetails.state}</label>
              </div>
              <div className="form-group">
                <label>Country:</label>
                &nbsp;
                <label>{this.props.studentDetails.country}</label>
              </div>
              <div className="form-group">
                <label>Contact No:</label>
                &nbsp;
                <label>{this.props.studentDetails.contactno}</label>
              </div>
              <div className="form-group">
                <label>Objective:</label>
                &nbsp;
                <label>{this.props.studentDetails.objective}</label>
              </div>
              <div>
                {this.props.studentDetails.editmode?(<button onClick={this.editStudentDetails} type="button" className="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-pencil"></span>
              </button>):(<div></div>)} 
              </div>           
            </div>
          </div>
          </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    studentDetails : state.studentDetails
  }
}

// export default Details;
export default connect(mapStateToProps, null)(Details);
