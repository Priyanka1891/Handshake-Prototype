import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import axios from 'axios';
import { fillStudentDetails } from "../../common_store/actions/login";

const initialState={
  editExperienceDetails : false,
  detailsSubmitted : false,
  currentStudentDetails : null
}

class Experience extends Component{
  constructor(props) {
    super(props);
    this.state = initialState;
    this.state.currentStudentDetails =
      this.props.otherStudentDetails ? this.props.otherStudentDetails : this.props.studentDetails;
  }

  dispatch = async (state) => {
    await this.props.fillStudentDetails(state);
    this.setState({
      currentStudentDetails : this.props.studentDetails
    });
    return this.props.studentDetails;
  }


  editStudentDetails = (e) =>{
    this.setState({
      editExperienceDetails : true
    })
  }

  deleteStudentDetails = (e) =>{
    e.preventDefault();
        const data = {index : this.state.currentStudentDetails.studentExperience[this.props.index]._id,
                  delete_experience_details : true}
    var studentDetails=this.state.currentStudentDetails;
    studentDetails.studentExperience.splice(this.props.index,1);
    // console.log("Data being sent is ",data);
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post('http://localhost:3001/student/deletedetails', data)
      .then(response => {
        // console.log("Delete Experience Response: ", response);
        if (response.status === 200) {
          this.dispatch(studentDetails)
            .then(result => {
              this.setState({
                detailsSubmitted : true
              })
            })
        }
    });
  }

  render(){
      let redirectVar = null;
      if (this.state.editExperienceDetails) {
        redirectVar = <Redirect to={{pathname :'/editexperiencedetails',state:this.props.index}}/>
      }

      return(
        <React.Fragment>
        {redirectVar}
        {this.state.currentStudentDetails.editmode?(<button type="button" onClick={this.editStudentDetails} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-pencil"></span>
                  </button>) :(<div></div>)} 
                  &nbsp;&nbsp;{this.state.currentStudentDetails.editmode?(<button type="button" onClick={this.deleteStudentDetails} className="btn btn-default btn-sm">
                  <span className="glyphicon glyphicon-trash"></span>
                  </button>):(<div></div>)} 
                  <br />
                  <label>Company Name :&nbsp;{this.state.currentStudentDetails.studentExperience.length?this.state.currentStudentDetails.studentExperience[this.props.index].companyname:null}</label>
                  <br />
                  <label>Job Title :&nbsp;{this.state.currentStudentDetails.studentExperience.length?this.state.currentStudentDetails.studentExperience[this.props.index].title:null}</label>
                  <br />
                  <label>Company Location :&nbsp;{this.state.currentStudentDetails.studentExperience.length?this.state.currentStudentDetails.studentExperience[this.props.index].companylocation:null}</label>
                  <br />
                  <label>Start Date :&nbsp;{this.state.currentStudentDetails.studentExperience.length?this.state.currentStudentDetails.studentExperience[this.props.index].startdate:null}</label>
                  &nbsp;&nbsp;
                  <label>End Date :&nbsp;{this.state.currentStudentDetails.studentExperience.length?this.state.currentStudentDetails.studentExperience[this.props.index].enddate:null}</label>
                  <br />
                  <label>Job Details :&nbsp;{this.state.currentStudentDetails.studentExperience.length?this.state.currentStudentDetails.studentExperience[this.props.index].jobdetails:null}</label>
        </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
  return {
    studentDetails : state.login.studentDetails,
    otherStudentDetails : state.login.otherStudentDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillStudentDetails : (details) => dispatch(fillStudentDetails(details))
  }
}


// export Experience Component  
export default connect(mapStateToProps, mapDispatchToProps)(Experience);