import React, { Component } from 'react';
import './MessageApp.css';
import Messages from "./Messages";
import {connect} from 'react-redux';
import Input from "./Input";
import axios from 'axios';
import { fillMsgDetailsList } from '../../common_store/actions/message'
import { backendURL } from   "../../Utils/config"


function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class MessageApp extends Component {
  state = {
    messages: [],
    member: {
      username: localStorage.getItem('username'),
      color: randomColor(),
    },
    backendmsgs: []
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("TQItdgGz1rVxLrJg", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
      var msgdetail = {
        sender : member.clientData.username,
        content : data,
        timestamp : new Date().getTime()
      }
      const backendmsgs = this.state.backendmsgs;
      backendmsgs.push(msgdetail);
      this.props.fillMsgDetailsList(backendmsgs);
      this.setState({backendmsgs});
    });
  }

  saveMessages = (e) => {
    this.props.closeMessageBox();
    e.preventDefault();
    if (this.state.backendmsgs.length < 1) {
      console.log("Skip posting message since no msg to be posted");
      return
    }
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    var data = {
     participants : [this.props.studentDetails.username ,
                     (this.props.otherStudentDetails ?  this.props.otherStudentDetails.username :
                      this.props.employerDetails.username)],
     messages : this.state.backendmsgs
    }
    console.log("Sending Data " + JSON.stringify(data));
    axios.post(`${backendURL}/messages/post`, data)
      .then(response => {
        console.log(response);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
         <h5> Message &nbsp; <button onClick = {this.saveMessages}><span className="glyphicon glyphicon-remove"></span></button></h5>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

function mapStateToProps(state) {
  return {
    employerDetails : state.login.employerDetails,
    studentDetails : state.login.studentDetails,
    otherStudentDetails : state.login.otherStudentDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillMsgDetailsList : (details) => dispatch(fillMsgDetailsList(details))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageApp);