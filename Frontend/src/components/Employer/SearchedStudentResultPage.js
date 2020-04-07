import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { fillBothDetails } from "../../common_store/actions/index";

const initialState={
  // listStudentsRegistered : null,
}

class SearchedStudentResultPage extends Component {

  constructor(props){
    super(props);
    this.state=initialState;
    this.renderSearchedStudents = this.renderSearchedStudents.bind(this);
    this.redirectStudentProfile = this.redirectStudentProfile.bind(this);
  }

  componentWillMount() {
    this.setState(initialState);

  }

  componentWillReceiveProps() {
    this.setState(initialState);
  }

  redirectStudentProfile = (e) => {
    const data ={
      username : e.target.value,
      editmode : false
    };
    console.log("Data being sent is"+ JSON.stringify(data));
    axios.post('http://localhost:3001/student/signin', data)
      .then(response=>{
        console.log("Entered inside axios post req", response);
        if(response.data.details){
          const newStudentDetails={...response.data.details,
              editmode : false
          }
          const bothDetails = {studentDetails : newStudentDetails, employerDetails : this.props.employerDetails};
          this.props.fillBothDetails(bothDetails);
        }
      })
  }

  renderSearchedStudents = () => {
    const students = this.props.studentList.map((item, index) => {
      return ( 
        <div key={item.username}>
            <div className = "">
              <button variant="secondary" type="submit" 
               value = {item.username} style={{width:'100px'}} onClick={this.redirectStudentProfile}><i className='glyphicon glyphicon-user'/>
               &nbsp;{item.username}'s Profile
              </button>
            </div>
        </div>
      );
    });
    return students;
  }
 
  render() {
    let redirectVar = null;
    if (this.props.studentDetails) {
      redirectVar = <Redirect to = '/studentprofilepage' />
    }
    return(
      <React.Fragment>
        {redirectVar}
        <div className="container" />
        <div className="login-form" />
        <div className="panel" />
        <div className="row-container">{this.renderSearchedStudents()}</div>
      </React.Fragment> 
    )
  }    
}

function mapStateToProps(state) {
  return {
    employerDetails : state.employerDetails,
    studentDetails : state.studentDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillBothDetails : (details) => dispatch(fillBothDetails(details))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchedStudentResultPage);
