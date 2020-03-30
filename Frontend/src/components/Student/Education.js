import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

const initialState={
  editEducationDetails : false
}

class Education extends Component{

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  editStudentDetails = (e) =>{
    this.setState({
      editEducationDetails : true
    })
  }

  render(){
      let redirectVar = null;
      if (this.state.editEducationDetails) {
        redirectVar = <Redirect to="/editeducationdetails" />
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
                  <h2>Education Overview</h2>
                </div>
                <div className="form-group">
                  <label>College Name: </label>
                &nbsp;
                  <label>{this.props.studentDetails.colgname}</label>
                </div>
                <div className="form-group">
                  <label>Location: </label>
                  <label>{this.props.studentDetails.location}</label>
                </div>
                <div className="form-group">
                  <label>Degree:</label>
                &nbsp;
                  <label>{this.props.studentDetails.degree}</label>
                </div>
                <div className="form-group">
                  <label>Major:</label>
                &nbsp;
                  <label>{this.props.studentDetails.major}</label>
                </div>
                <div className="form-group">
                  <label>Year of Passing:</label>
                &nbsp;
                  <label>{this.props.studentDetails.yearofpassing}</label>
                </div>
                <div className="form-group">
                  <label>CGPA:</label>
                &nbsp;
                  <label>{this.props.studentDetails.cgpa}</label>
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
  

// exportEducation Component
export default connect(mapStateToProps, null)(Education);