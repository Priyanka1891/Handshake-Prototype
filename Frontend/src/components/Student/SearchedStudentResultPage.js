import React, {Component} from 'react';
import axios from 'axios';
// import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { fillOtherStudentDetails } from "../../common_store/actions/index";

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
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post('http://localhost:3001/student/signin', data)
      .then(response=>{
        console.log("Entered inside axios post req", response);
        if(response.data.details){
          const bothDetails = {studentDetails : this.props.studentDetails , 
                               otherStudentDetails : response.data.details};
          this.props.fillOtherStudentDetails(bothDetails);
        }
      })
  }

  renderSearchedStudents = () => {
    const students = this.props.studentList.map((item, index) => {
      if (item.username === this.props.studentDetails.username) {
        return (<div/>)
      }
      return ( 
        <div key={item.username}>
            <div className = "">
              <button variant="secondary" type="submit" 
               value = {item.username} style={{width:'100px'}} onClick={this.redirectStudentProfile}><i className='glyphicon glyphicon-user'/>
               &nbsp;{item.username}'s Profile
              </button>
            </div>
            <br/>
        </div>
      );
    });
    return students;
  }
 
  render() {
    let redirectVar = null;
    if (this.props.otherStudentDetails) {
      redirectVar = <Redirect to = '/studentprofilepage'/>
    }
    return(
      <React.Fragment>
        {redirectVar}
        {/* <div className="container" />
        <div className="login-form" />
        <div className="panel" /> */}
        <div className="row-container">{this.renderSearchedStudents()}</div>
      </React.Fragment> 
    )
  }    
}

function mapStateToProps(state) {
  return {
    studentDetails : state.studentDetails,
    otherStudentDetails : state.otherStudentDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillOtherStudentDetails : (details) => dispatch(fillOtherStudentDetails(details))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchedStudentResultPage);
