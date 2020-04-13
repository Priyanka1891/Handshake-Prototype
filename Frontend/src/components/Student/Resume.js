import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import { fillStudentDetails } from "../../common_store/actions/index";

class Resume extends Component {

  constructor(props) {
    super(props);
      this.state = {
        readData: null,
        numPages: null,
        pageNumber: 1,
        viewResume : false,
        buttonValue : "View Resume"
      }
  }
  onChangeHandler = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.setState({
        readData: e.target.result
      })
    } 
  }
  
  dispatch = async (state) => {
    await this.props.fillStudentDetails(state)
    return this.props.studentDetails;
  }

  onClickHandler = () => {
    if (!this.state.readData) {
      window.alert("Resume upload failed, either path is empty or some error happened");
      return;
    }
    var studentDetails = this.props.studentDetails;
    studentDetails.resume = this.state.readData;
    const data = {details : studentDetails , upload_resume : true};
    console.log("Sending data with resume: ", data);
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post('http://localhost:3001/student/editdetails', data)
      .then(response => {
        if (response.data.code===200) {
          this.dispatch(studentDetails).then((result) => {});
          window.alert("Resume uploaded successfully");
          this.props.enableapply()
        } else {
          window.alert("Resume upload failed");
        }
    })
  }

  viewResumeHandler = (e) => {
    if (this.state.buttonValue === "View Resume") {
      this.setState({
        viewResume: true,
        buttonValue: "Close"
      })
    } else {
      this.setState({
        viewResume: false,
        buttonValue: "View Resume"
      })
    }
    this.props.enableapply()
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  pdfViewer = (pdfbase64) => {
    const { pageNumber, numPages } = this.state;
    return (
      <div>
        <Document
          file= {pdfbase64}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    )
  }

  render(){
    return(
      <React.Fragment>
        {this.state.viewResume ? this.pdfViewer(this.props.studentDetails.resume): <div/>}  
        <button type="button" className="btn btn-success" onClick={this.viewResumeHandler}>{this.state.buttonValue}</button>
        {this.props.studentDetails.editmode ? (
          <div><h2 id='Resume'>Upload Resume</h2>
            <input type="file" name="file" onChange={this.onChangeHandler} />
            <br />
            <button type="button" className="btn btn-success" onClick={this.onClickHandler}>Upload</button> 
            <br />
          </div>) : 
          <div/>} 
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    studentDetails : state.studentDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fillStudentDetails : (details) => dispatch(fillStudentDetails(details))
  }
}

// export Resume Component
export default connect(mapStateToProps, mapDispatchToProps)(Resume);