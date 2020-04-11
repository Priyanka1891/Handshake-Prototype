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
    axios.post('http://localhost:3001/student/editdetails', data)
      .then(response => {
        if (response.data.code==200) {
          this.dispatch(studentDetails).then((result) => {});
          window.alert("Resume uploaded successfully");
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
export default connect(mapStateToProps, null)(Resume);








// Profile Image

{/* <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" />
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
        <section id="team" className="pb-5">
          <div className="container">
            <h5 className="section-title h1">OUR TEAM</h5>
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-4">
                <div className="image-flip" ontouchstart="this.classList.toggle('hover');">
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card">
                        <div className="card-body text-center">
                          <p><img className=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image" /></p>
                          <h4 className="card-title">Sunlimetech</h4>
                          <p className="card-text">This is basic card with image on top, title, description and button.></p>
                          <a href="#" className="btn btn-primary btn-sm"><i className="fa fa-plus" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div> 
        </section>         */}
                

