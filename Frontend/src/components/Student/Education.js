import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import axios from 'axios';
import { fillStudentDetails } from "../../common_store/actions/login";
import { backendURL } from   "../../Utils/config"



const initialState={
  editEducationDetails : false,
  detailsSubmitted : false,
}

class Education extends Component{

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  dispatch = async (state) => {
    await this.props.fillStudentDetails(state);
    return this.props.studentDetails;
  }


  editStudentDetails = (e) =>{
    this.setState({
      editEducationDetails : true
    })
  }


  deleteStudentDetails = (e) =>{
    e.preventDefault();
    const data = {index : this.props.studentDetails.studentEducation[this.props.index]._id,
                  delete_education_details : true}
    var studentDetails=this.props.studentDetails;
    studentDetails.studentEducation.splice(this.props.index, 1);
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendURL}/student/deletedetails`, data)
      .then(response => {
        console.log("Delete Education Response: ", response);
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
      if (this.state.editEducationDetails) {
        redirectVar = <Redirect to={{pathname :'/editeducationdetails',state:this.props.index}}/>
      }
      return(
        <React.Fragment> 
        {redirectVar}
                  {this.props.studentDetails.editmode && (this.props.studentDetails.studentEducation.length > this.props.index)?(<button type="button" onClick={this.editStudentDetails} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-pencil"></span>
                  </button>) :(<div></div>)} 
                  &nbsp;&nbsp;{this.props.studentDetails.editmode && (this.props.studentDetails.studentEducation.length > this.props.index)?(<button type="button" onClick={this.deleteStudentDetails} className="btn btn-default btn-sm">
                  <span className="glyphicon glyphicon-trash"></span>
                  </button>):(<div></div>)} 
                  <br/>
                  {(this.props.studentDetails.studentEducation.length > this.props.index) ?
                  <label>College Name :&nbsp;
                  {this.props.studentDetails.studentEducation[this.props.index].colgname}</label>: <label />}
                  <br />
                  {(this.props.studentDetails.studentEducation.length > this.props.index) ?
                  <label>Location :&nbsp;{this.props.studentDetails.studentEducation[this.props.index].location}</label>:<label/>}
                  <br />
                  {(this.props.studentDetails.studentEducation.length > this.props.index) ?
                  <label>Degree :&nbsp;{
                  this.props.studentDetails.studentEducation[this.props.index].degree}</label> : <label/>}
                  <br />
                  {(this.props.studentDetails.studentEducation.length > this.props.index) ?
                  <label>Major :&nbsp;{
                  this.props.studentDetails.studentEducation[this.props.index].major}</label> : <label/>}
                  <br />
                  {(this.props.studentDetails.studentEducation.length > this.props.index) ?
                  <label>Year of Passing :&nbsp;{
                  this.props.studentDetails.studentEducation[this.props.index].yearofpassing}</label>: <label/>}
                  <br />
                  {(this.props.studentDetails.studentEducation.length > this.props.index) ?
                  <label>CGPA :&nbsp;{
                  this.props.studentDetails.studentEducation[this.props.index].cgpa}</label> : <label/>}  
          </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
  return {
    studentDetails : state.login.studentDetails,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fillStudentDetails : (details) => dispatch(fillStudentDetails(details))
  }
}
  

// exportEducation Component
export default connect(mapStateToProps, mapDispatchToProps)(Education);