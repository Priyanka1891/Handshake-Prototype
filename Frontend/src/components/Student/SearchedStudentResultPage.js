import React, {Component} from 'react';
import axios from 'axios';
// import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { backendURL } from   "../../Utils/config"


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
    axios.post(`${backendURL}/student/signin`, data)
      .then(response=>{
        console.log("Entered inside axios post req", response);
        if(response.data.details){
          // TODO
          // const bothDetails = {studentDetails : this.props.studentDetails , 
          //                      otherStudentDetails : response.data.details};
          // this.props.fillOtherStudentDetails(bothDetails);
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
            <h2>{item.username}</h2>
            <div className = "">
              <button className="btn btn-link" type="submit" 
               value = {item.username} onClick={this.redirectStudentProfile}>
               Click to view Profile
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
    // if (this.props.otherStudentDetails) {
    //   redirectVar = <Redirect to = '/studentprofilepage'/>
    // }
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
    studentDetails : state.login.studentDetails
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     fillOtherStudentDetails : (details) => dispatch(fillOtherStudentDetails(details))
//   }
// }

export default connect(mapStateToProps, null)(SearchedStudentResultPage);
