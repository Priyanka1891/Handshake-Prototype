import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Row, Col, Pagination} from 'react-bootstrap';


const initialState={
  jobId : null,
  username : null,
  viewjob : null,
  activePage: 1
}
class JobResultPage extends Component {

  constructor(props){
    super(props);
    this.state=initialState;
    this.viewJob = this.viewJob.bind(this);
    // this.searchedJobs = this.searchedJobs.bind(this);
  }

  changePage = (e) => {
    let page = this.state.activePage;
    if (e.target.text === ">" && page !== parseInt(e.target.name, 10)) {
        page += 1;
    } else if (e.target.text === "<" && page !== parseInt(e.target.name, 10)) {
        page -= 1;
    } else {
        page = parseInt(e.target.name, 10);
    }
    this.setState({
        activePage: page
    });
  };  

  viewJob = (e) => {
    let jobdetails={};
    console.log("Reached here with jobDetails as",this.props.jobDetails);
    for(let idx=0;idx<this.props.jobDetails.length;idx++){
      if(e.target.value===this.props.jobDetails[idx]._id){
        jobdetails=this.props.jobDetails[idx];
      }
    }
    this.setState({
      viewjob : jobdetails
    })    
  }

  // searchedJobs = () => {
  //   const jobs = this.props.jobDetails.map((job, index) => {
  //        return ( 
  //           <React.Fragment>
  //             {/* <div key={job._id}/> */}
  //                 <tr >
  //                   <td className="text-center" scope="row">{job.title}</td>
  //                   <td >{job.location}</td>
  //                   <td >{job.createdate}</td>
  //                   <td >{job.enddate}</td>
  //                   <td >{job.salary}</td>
  //                   <td >{job.type}</td>
  //                   <td >{job.createdby}</td>
  //                   <td><button type="submit" className = "btn btn-link" value={job._id} onClick={this.viewJob}>View</button></td>
  //                 </tr>
  //           </React.Fragment>
  //               );
  //     });
  //    return jobs;
  // }

  sectionItems (jobDetails) {
    return (
                 <React.Fragment>
              {/* <div key={job._id}/> */}
                  <tr >
                    <th className="text-center" scope="row">{jobDetails.title}</th>
                    <td >{jobDetails.location}</td>
                    <td >{jobDetails.createdate}</td>
                    <td >{jobDetails.enddate}</td>
                    <td >{jobDetails.salary}</td>
                    <td >{jobDetails.type}</td>
                    <td >{jobDetails.createdby}</td>
                    <td><button type="submit" className = "btn btn-link" value={jobDetails._id} onClick={this.viewJob}>View</button></td>
                  </tr>
            </React.Fragment>

    )
  }


  render() {
    let redirectVar = null,
            section,
            active = 1,
            itemsToShow = 3,
            pagesBar = null,
            renderOutput = [];

    if (this.state.viewjob) {
      redirectVar = <Redirect to={{pathname : '/viewjobdetails',state: this.state.viewjob} }/>
    }  //console.log(this.props.jobDetails);  

    if (this.state && this.state.activePage) {
      active = this.state.activePage;
    }

    if (this.props.jobDetails && this.props.jobDetails.length > 0) {
      let sectionCount = 0;
      for (var i = (active - 1) * itemsToShow; i < this.props.jobDetails.length; i++) {
          section = this.sectionItems(this.props.jobDetails[i]);
          renderOutput.push(section);
          if (++sectionCount === itemsToShow)
              break;
      }

      let pages = [];
      let pageCount = Math.ceil(this.props.jobDetails.length / itemsToShow);

      for (let i = 1; i <= pageCount; i++) {
          pages.push(
              <Pagination.Item active={i === active} name={i} key={i} onClick={this.changePage}>
                  {i}
              </Pagination.Item>
          );
      }
      pagesBar = (
          <div>
              <br />
              <Pagination>
                  <Pagination.Prev name="1" onClick={this.changePage} />
                  {pages}
                  <Pagination.Next name={pageCount} onClick={this.changePage} />
              </Pagination>
          </div>
      );
    }

    return(
      <React.Fragment>
        {redirectVar}
        {
          this.props.jobDetails.length?<div>
          <h2 style={{align:'center'}}>Here are few jobs for you</h2>
          <br />
          <table className="table table-borderless table-hover">
            <thead >
              <tr>
                <th className="text-center">Job Title</th>
                <th className="text-center">Location</th>
                <th className="text-center">Posting Date</th>
                <th className="text-center">End Date</th>
                <th className="text-center">Salary</th>
                <th className="text-center">Type</th>
                <th className="text-center">Company Name</th>
              </tr>
            </thead>
            {renderOutput}

            <tbody>
            <Row>
                <Col sm={4}></Col>
                <Col>{pagesBar}</Col>
          </Row>

              {/* {this.searchedJobs()} */}
            </tbody>
          </table>
          </div>:<div></div>
        }
      </React.Fragment> 
    )
  }    
} 

function mapStateToProps(state) {
  return {
    studentDetails : state.login.studentDetails
  }
}
export default connect(mapStateToProps, null)(JobResultPage);
