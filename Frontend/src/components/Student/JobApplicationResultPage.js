import React, {Component} from 'react';
import {connect} from 'react-redux';


class JobApplicationResultPage extends Component {

  constructor(props){
    super(props);
    this.getApplicationDate = this.getApplicationDate.bind(this);
    this.getApplicationStatus = this.getApplicationStatus.bind(this);
  }


  getApplicationDate=(i)=>{
    var studentsapplied = this.props.studentList[i].studentsapplied;
    for (var idx =0 ; idx < studentsapplied.length ; ++idx) {
      if (studentsapplied[idx].username === this.props.studentDetails.username) {
        return studentsapplied[idx].applicationdate;
      }
    }
  }

  getApplicationStatus=(i)=>{
    var studentsapplied = this.props.studentList[i].studentsapplied;
    for (var idx =0 ; idx < studentsapplied.length ; ++idx) {
      if (studentsapplied[idx].username === this.props.studentDetails.username) {
        return studentsapplied[idx].status;
      }
    }
  }
  listResults(){
    // console.log("here",this.props.studentList);
      const results = this.props.studentList.map((result, index) => {
         return ( 
          <React.Fragment>
              <tr>
               <th scope="row" className="text-center">{result.title}</th>
               <td>{this.getApplicationDate(index)}</td>
               <td>{this.getApplicationStatus(index)}</td>
              </tr>
           </React.Fragment>
          );
      });
     return results;
  }
 
  render() {
    return(
      <React.Fragment>{this.props.studentList.length?<div>
        {/* <div><h2 style={{align:'center'}}>Upcoming event List :</h2></div>
        <br /> */}
        <table className="table table-borderless table-hover">
         <thead className="thead-dark">
          <tr>
            <th className="text-center">Title</th>
            <th className="text-center">Date Applied</th>
            <th className="text-center">Application Status</th>
          </tr>
          </thead>
          <tbody>
            {this.listResults()}
          </tbody>
        </table>
        </div>:<div></div>}
      </React.Fragment> 
    )
  }    
}


function mapStateToProps(state) {
  return {
    studentDetails : state.login.studentDetails
  }
}
export default connect(mapStateToProps, null)(JobApplicationResultPage);
