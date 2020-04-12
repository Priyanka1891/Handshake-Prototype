import {Component} from "react";
import React from "react";
import axios from 'axios';
import {connect} from 'react-redux';

const initialState={
  messageList : null
}

class ListAllMessages extends Component {
  constructor (props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    const data = {
      username : this.props.studentDetails.username
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data " + JSON.stringify(data));
    axios.post('http://localhost:3001/messages/list',data)
      .then(response => {
        console.log("Messages : ", response.data);
        this.setState({
          messageList : response.data
        })
    });
  }


  render() {
    return (
      <div>Hello</div>
    )
  }
  

}

function mapStateToProps(state) {
  return {
    employerDetails : state.employerDetails,
    studentDetails : state.studentDetails
  }
}

export default connect(mapStateToProps, null)(ListAllMessages);