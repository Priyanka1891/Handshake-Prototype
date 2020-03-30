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

  editEmployerDetails = (e) =>{
    this.setState({
      editDetails : true
    })
  }

  render(){
      let redirectVar = null;
      if (this.state.editDetails) {
        redirectVar = <Redirect to="/editemployerdetails" />
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
                <span onClick = {this.editEmployerDetails} className="glyphicon glyphicon-pencil"></span>
                </ul> */}
              </div>
              <div className="form-group">
                <label>Name:</label>
                &nbsp;
                <label>{this.props.employerDetails.name}</label>
              </div>
              <div className="form-group">
                <label>Location:</label>
                &nbsp;
                <label>{this.props.employerDetails.location}</label>
              </div>
              <div className="form-group">
                <label>Description:</label>
                &nbsp;
                <label>{this.props.employerDetails.description}</label>
              </div>
              <div className="form-group">
                <label>Contact Information:</label>
                &nbsp;
                <label>{this.props.employerDetails.contactno}</label>
              </div>
              <button onClick={this.editEmployerDetails} type="button" className="btn btn-default btn-sm">
                <span className="glyphicon glyphicon-pencil"></span>
              </button>
            </div>
          </div>
          </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    employerDetails : state.employerDetails
  }
}

// export default Details;
export default connect(mapStateToProps, null)(Details);
