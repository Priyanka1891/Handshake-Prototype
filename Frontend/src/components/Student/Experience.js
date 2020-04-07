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
        redirectVar = <Redirect to={{pathname :'/editexperiencedetails',state:this.props.index}}/>
      }

      return(
        <React.Fragment>
        {redirectVar}
        <br />

        {this.props.studentDetails.editmode?(<button type="button" onClick={this.editStudentDetails} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-pencil"></span>
                  </button>) :(<div></div>)} 
                  <br />
                  <label>Company Name :&nbsp;{this.props.studentDetails.studentExperience[this.props.index].companyname}</label>
                  <br />
                  <label>Job Title :&nbsp;{this.props.studentDetails.studentExperience[this.props.index].title}</label>
                  <br />
                  <label>Company Location :&nbsp;{this.props.studentDetails.studentExperience[this.props.index].companylocation}</label>
                  <br />
                  <label>Start Date :&nbsp;{this.props.studentDetails.studentExperience[this.props.index].startdate}</label>
                  &nbsp;&nbsp;
                  <label>End Date :&nbsp;{this.props.studentDetails.studentExperience[this.props.index].enddate}</label>
                  <br />
                  <label>Job Details :&nbsp;{this.props.studentDetails.studentExperience[this.props.index].jobdetails}</label>
        </React.Fragment>
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