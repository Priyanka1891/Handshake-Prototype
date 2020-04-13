import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';


const initialState={
  jobId : null,
  username : null,
  viewJob : null
}
class JobResultPage extends Component {

  constructor(props){
    super(props);
    this.state=initialState;
    this.applyJobs = this.applyJobs.bind(this);
    this.searchedJobs = this.searchedJobs.bind(this);
  }

  applyJobs = (e) => {
    let jobdetails={};
    console.log("Reached here with jobDetails as",this.props.jobDetails);
    for(let idx=0;idx<this.props.jobDetails.length;idx++){
      if(e.target.value===this.props.jobDetails[idx]._id){
        jobdetails=this.props.jobDetails[idx];
      }
    }
    this.setState({
      viewJob : jobdetails
    })    
  }

  searchedJobs = () => {
    const jobs = this.props.jobDetails.map((job, index) => {
         return ( 
            <React.Fragment>
              {/* <div key={job._id}/> */}
                  <tr >
                    <th scope="row">{job.title}</th>
                    <td><button type="submit" value={job._id} onClick={this.applyJobs}>View</button></td>
                  </tr>
            </React.Fragment>
                );
      });
     return jobs;
  }

  render() {
    let redirectVar = null;
    if (this.state.viewJob) {
      redirectVar = <Redirect to={{pathname : '/viewjobdetails',state: this.state.viewJob} }/>
    }    
    return(
      <React.Fragment>
        {redirectVar}
        <div><h2 style={{align:'center'}}>Here are few jobs for you</h2></div>
        <br />
        <table className="table table-borderless table-hover">
         <thead >
          <tr>
            <th>Job Title</th>
          </tr>
          </thead>
          <tbody>
            {this.searchedJobs()}
          </tbody>
        </table>
      </React.Fragment> 
    )
  }    
} 

function mapStateToProps(state) {
  return {
    studentDetails : state.studentDetails
  }
}
export default connect(mapStateToProps, null)(JobResultPage);
