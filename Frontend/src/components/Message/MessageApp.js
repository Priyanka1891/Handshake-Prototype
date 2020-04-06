import React, { Component } from 'react';
import './MessageApp.css';
import Messages from "./Messages";
import Input from "./Input";
import axios from 'axios';


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
        content : data
      }
      const backendmsgs = this.state.backendmsgs;
      backendmsgs.push(msgdetail);
      this.setState({backendmsgs});
    });
  }

  saveMessages = (e) => {
    this.props.closeMessageBox();
    e.preventDefault(); 
    axios.defaults.withCredentials = true;
    var data = {
     participants : ['usera', 'userb'],
     messages : this.state.backendmsgs
    }
    console.log("Sending Data " + JSON.stringify(data));
    axios.post('http://localhost:3001/messages/post', data)
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

export default MessageApp;
