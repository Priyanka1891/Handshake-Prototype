import {Component} from "react";
import React from "react";
import {Redirect} from 'react-router';
import axios from 'axios';
import {connect} from 'react-redux';
import './MessageApp.css';
import { Button, Card, Col, Row, Form, Image, Alert } from "react-bootstrap";

const initialState={
  messageList : null,
  messageCards : null
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
        this.setState({
          messageList : response.data
        })
    });
  }

  renderMessage = (e) => {
    let messageCards = null;
    let messageCard;
    var index = e.target.id;
    console.log("Reached here ", this.state.messageList, index)

    if (this.state.messageList && index) {
        let messages = this.state.messageList[index].messages;
        messageCards = [];
        for (let i = 0; i < messages.length; i++) {
            var timestamp=(messages[i].timestamp);
            timestamp = new Date(parseInt(timestamp));
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
                <Form onSubmit={this.sendMessage} >
                    <Form.Control as="textarea" rows="3" name="input_message" placeholder="Type your message..." onChange={this.onChange} pattern="^[A-Za-z0-9 ,.-]+$" required />
                    <br />
                    <center>
                        <Button type="submit" variant="success">Send</Button>{"  "}
                    </center>
                </Form>
            </div>
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employerDetails : state.employerDetails,
    studentDetails : state.studentDetails
  }
}

export default connect(mapStateToProps, null)(ListAllMessages); 