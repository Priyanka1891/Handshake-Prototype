import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import Resume from './Resume';


const initialState={
  applyjob : false,
  enableApply : false
}


class ViewJobDetails extends Component {
  constructor(props){
    super(props);
    this.state=initialState;
    this.uploadresume = this.uploadresume.bind(this);
  }
  uploadresume = (e) => {
    console.log("here");
    e.preventDefault();
    this.setState({
      applyjob : true
    }) 
  }
    // e.preventDefault();
    // const data = {
    //   jobId : e.target.value,
    //   username : this.props.studentDetails.username
    // };

    // axios.defaults.withCredentials = true;
    // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    // console.log("Sending Data "+ JSON.stringify(data));
    // axios.post('http://localhost:3004/jobs/jobsapplied',data)
    //   .then(response => {
    //     console.log("Entered inside axios post req");
    //     if(response.data){
    //       window.alert("Job applied successfully");
    //     }
    // });}
  enableApply = ()=> {
    console.log("Reached here enable apply")
    this.setState({
      enableApply : true
    })
  }

  render() {
    // console.log("REACHED HERE ", this.props.location.state);
      return(
        <React.Fragment>
        <StudentNavbar/>
        <div class="container">
          <h2>{this.props.location.state.title}</h2>
          <br />
          <div class="card">
           <div class="card-body">
            <label for="usr">Create Date :&nbsp;&nbsp;&nbsp;{this.props.location.state.createdate}</label>
            <label for="usr">End Date :&nbsp;&nbsp;&nbsp;{this.props.location.state.enddate}</label>
            <label for="usr">Location :&nbsp;&nbsp;&nbsp;{this.props.location.state.location}</label>
            <label for="usr">Salary :&nbsp;&nbsp;&nbsp;{this.props.location.state.salary}</label>
            <label for="usr">Job Type :&nbsp;&nbsp;&nbsp;{this.props.location.state.type}</label>
            <label for="usr">Company Name :&nbsp;&nbsp;&nbsp;{this.props.location.state.createdby}</label>
            <br/>
            {this.state.enableApply ?
              <button type="button" className="btn btn-success">Apply</button>
              :
              <button type="button" className="btn btn-success" disabled>Apply</button>
            }
            <button type="button"className="btn btn-danger">Cancel</button>  
            <button type="button" onClick={this.uploadresume}className="btn btn-warning">Upload Resume</button>      
           </div>
          </div>
          <br/>
          <br/>
          {this.state.applyjob ?
         <Resume enableApply = {this.enableApply}/> : <div/>}
        </div>
        </React.Fragment>
      )
  }
}


export default ViewJobDetails;


