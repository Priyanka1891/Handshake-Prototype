import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Resume extends Component {

  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null
      }
  }
  onChangeHandler = event=>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }
  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post('http://localhost:3001/studentsignin/resume',data)
      .then(response => {
        console.log("Success",response.data);
    })
  }
  render(){
    return(
      <React.Fragment>
                <input type="file" name="file" onChange={this.onChangeHandler} />
                <br />
                <button type="button" className="btn btn-success" onClick={this.onClickHandler}>Upload</button> 
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    studentDetails : state.studentDetails
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
                

