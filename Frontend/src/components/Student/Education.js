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
        redirectVar = <Redirect to={{pathname :'/editeducationdetails',state:this.props.index}}/>
      }

      return(
        <React.Fragment> 
        {redirectVar}
                  {this.props.studentDetails.editmode?(<button type="button" onClick={this.editStudentDetails} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-pencil"></span>
                  </button>) :(<div></div>)} 
                  <br />
                  <label>College Name :&nbsp;{this.props.studentDetails.studentEducation?
                  this.props.studentDetails.studentEducation[this.props.index].colgname:null}</label>
                  <br />
                  <label>Location :&nbsp;{this.props.studentDetails.studentEducation?
                  this.props.studentDetails.studentEducation[this.props.index].location:null}</label>
                  <br />
                  <label>Degree :&nbsp;{this.props.studentDetails.studentEducation?
                  this.props.studentDetails.studentEducation[this.props.index].degree:null}</label>
                  <br />
                  <label>Major :&nbsp;{this.props.studentDetails.studentEducation?
                  this.props.studentDetails.studentEducation[this.props.index].major:null}</label>
                  <br />
                  <label>Year of Passing :&nbsp;{this.props.studentDetails.studentEducation?
                  this.props.studentDetails.studentEducation[this.props.index].yearofpassing:null}</label>
                  <br />
                  <label>CGPA :&nbsp;{this.props.studentDetails.studentEducation?
                  this.props.studentDetails.studentEducation[this.props.index].cgpa:null}</label>    
          </React.Fragment>
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