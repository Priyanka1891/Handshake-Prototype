import {Component} from "react";
import React from "react";
import {Redirect} from 'react-router';
import axios from 'axios';
import './MessageApp.css';
import { Button, Card, Col, Row, Form} from "react-bootstrap";

const initialState={
  messageList : null,
  messageCards : null,
  currentMsg : null
}

class ListAllMessages extends Component {
  constructor (props) {
    super(props);
    this.state = initialState;
    this.textInput = React.createRef(null);
  }

  componentWillMount() {
    const data = {
      username : localStorage.getItem('username')
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log("Sending Data " + JSON.stringify(data));
    axios.post('http://localhost:3001/messages/list',data)
      .then(response => {
        this.setState({
          messageList : response.data
        })
    });
  }

  msgChangeHandler = (e) => {
     var msg  = {};
     msg.sender = localStorage.getItem('username');
     msg.content = e.target.value;
     msg.timestamp = new Date().getTime()
     this.setState({
       currentMsg : msg
     })
  } 

  sendMessage = (e) => {
    var index =e.target.id;
    var messageList = this.state.messageList;
    messageList[index].messages.push(this.state.currentMsg);

    var msgDump = {};
    var userb = messageList[index].userb;
    msgDump.usera = localStorage.getItem('username');
    msgDump.userb =  (localStorage.getItem('username') === userb)? this.state.messageList[index].usera : userb;

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    var data = {
     participants : [msgDump.usera , msgDump.userb],
     messages : [this.state.currentMsg]
    }
    console.log("Sending Data " + JSON.stringify(data));
    axios.post('http://localhost:3001/messages/post', data)
      .then(response => {
        console.log(response);
        console.log("here ", messageList)
        this.setState({
          messageList : messageList
        });
        this.textInput.current.reset();
    });    
  }

  renderMessage = (e) => {
    let messageCards = null;
    let messageCard;
    var index = e.target.id;

    if (this.state.messageList[index]) {
        let messages = this.state.messageList[index].messages;
        messageCards = [];
        for (let i = 0; i < messages.length; i++) {
            var timestamp=(messages[i].timestamp);
            timestamp = new Date(parseInt(timestamp, 10));
            timestamp = timestamp.toLocaleString();

            messageCard = (
                <Card style={{ width: "40rem" }}>
                    <Row>
                        <Col>
                            <Card.Body>
                                <b>{messages[i].sender}:</b><br />
                                {messages[i].content}
                            </Card.Body>
                      <Card.Subtitle className="mb-2 text-muted" align="right">{timestamp}</Card.Subtitle>
                        </Col>
                    </Row>
                </Card>
            );

            if (messages[i].usera === localStorage.getItem("username") ||
                messages[i].userb === localStorage.getItem("username")) {
                messageCards.push(
                    <div>
                        <Row>
                            <Col sm={4}></Col>
                            <Col>
                                {messageCard}
                            </Col>
                        </Row>
                        <br />
                    </div>
                );
            }
            else {
                messageCards.push(
                    <div key= {timestamp}>  
                        <Row>
                            <Col>
                                {messageCard}
                            </Col>
                        </Row>
                        <br />
                    </div>
                );
            }
        }
        messageCards.push(
          <Form ref={this.textInput} >
          <Form.Control as="textarea" rows="3" id={index}  placeholder="Type your message..." onChange={this.msgChangeHandler} pattern="^[A-Za-z0-9 ,.-]+$" required />
          <br />
          <center>
              <Button variant="success" id={index} onClick={this.sendMessage} >Send</Button>{"  "}
          </center>
          </Form>
        )
    }
    this.setState({
      messageCards : messageCards
    })
  }


  listMessageHistory = () => {
    if (!this.state.messageList) { 
      return <div/>;
    }
    const listMessageHistory = this.state.messageList.map((message, index) => {
      return(
        <div style={{height:'80px', width:'200px', background: '#f2f2f2', border: '1px solid grey'}} 
             id = {index} onClick = {this.renderMessage}>
          <tr>
            <th scope="row" className="text-center">{
                (localStorage.getItem("username") === message.usera) ? message.userb : message.usera}:&nbsp;</th>
            <td>{message.messages[message.messages.length -1].content}</td>
          </tr>
          <br/>
         <sub><i>last message</i></sub>
        </div>
      );

    });
    return listMessageHistory;
  }
 

  render() {  
    let redirectVar = null;
   
    if (!localStorage.getItem("token")) {
        redirectVar = <Redirect to="/" />;
    }

    return (
        <div>
            {redirectVar}
            <div style={{display:'flex'}} >
              <div className="col col-md-offset-2"></div>

              <div className="row-container">
              {this.listMessageHistory()}
              </div>
              <div className="class col-md-offset-2"></div>
              <div className="justify-content" >
                  {this.state.messageCards}
              </div>
            </div>
        </div>
    );
  }
}


export default ListAllMessages; 
