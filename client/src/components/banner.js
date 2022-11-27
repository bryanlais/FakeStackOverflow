import React from 'react';
import '../index.css';

export default class Banner extends React.Component {
  constructor(props){
    super(props);
    //States for pages:
    //qpage,answerspage,tpage,searchpage,qerrors,aerrors,qaskpage,tlinkpage
    this.state = {page: props.page, user: props.user};
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event){
    if(event.key === 'Enter'){
      this.props.statehandler('searchpage'+event.target.value,this.props.user);
    }
  }

  signOut(){
    console.log("Signing out...")
    window.location.reload();
    //onClick={()=>statehandler('loginpage',false)}
  }

  render(){
    var statehandler = this.props.statehandler;
    this.state = {page: this.props.page, user: this.props.user}; //Set state to parent.
    if(this.props.user.username.localeCompare("guest account") == 0){
    return(
    <nav className="navbar fixed-top navbar-light bg-light">
      <a class="navbar-brand"> Fake Stack Overflow </a>
      <a id="questions" className={(this.state.page == "qpage" ? "clicked text-decoration-none" : "text-decoration-none")} onClick={()=>statehandler('qpage',this.props.user)}> Questions </a>
      <a id="tags" className={(this.state.page == "tpage" ? "clicked text-decoration-none" : "text-decoration-none")} onClick={()=>statehandler('tpage',this.props.user)}> Tags </a>
      <a id="logout" className="text-decoration-none" onClick={this.signOut}> Sign Out </a>
      <input type="text" id="search" placeholder="Search..." onKeyPress={this.handleKeyPress}></input>
    </nav>
    );
    }
    else{
      return(
        <nav className="navbar fixed-top navbar-light bg-light">
          <a class="navbar-brand"> Fake Stack Overflow </a>
          <a id="questions" className={(this.state.page == "qpage" ? "clicked text-decoration-none" : "text-decoration-none")} onClick={()=>statehandler('qpage',this.props.user)}> Questions </a>
          <a id="tags" className={(this.state.page == "tpage" ? "clicked text-decoration-none" : "text-decoration-none")} onClick={()=>statehandler('tpage',this.props.user)}> Tags </a>
          <a id="logout" className="text-decoration-none" onClick={()=>statehandler('profilepage',this.props.user)}> {this.props.user.username}</a>
          <a id="logout" className="text-decoration-none" onClick={this.signOut}> Sign Out </a>
          <input type="text" id="search" placeholder="Search..." onKeyPress={this.handleKeyPress}></input>
        </nav>
        );
    }
  }
}
