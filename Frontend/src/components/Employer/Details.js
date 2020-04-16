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
        <React.Fragment>
        <div>
        {redirectVar}
          <br />
                <h2>Profile Overview</h2>
                {this.props.editmode ?
                  (<button onClick={this.editEmployerDetails} type="button" className="btn btn-default btn-sm">
                  <span className="glyphicon glyphicon-pencil"></span>
                  </button>) : <div/>}
              <br />
              <br />
              <div className="form-group">
                <label>Name :&nbsp;
                {this.props.employerDetails.name}</label>
              </div>
              <div className="form-group">
                <label>Location :&nbsp;
                {this.props.employerDetails.location}</label>
              </div>
              <div className="form-group">
                <label>Description :&nbsp;
                  {this.props.employerDetails.description}</label>
              </div>
              <div className="form-group">
                <label>Contact Information :&nbsp;
                {this.props.employerDetails.contactno}</label>
              </div>
          </div>
        </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
  return {
    employerDetails : state.login.employerDetails
  }
}

// export default Details;
export default connect(mapStateToProps, null)(Details);
