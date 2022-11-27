import React from 'react';
import Banner from './banner.js'
import Mainbody from './mainbody.js'
import Login from './login.js'


export default class FakeStackOverflow extends React.Component {

  constructor(props) {
    super(props);
    //States for pages:
    //qpage,answerspage,tpage,searchpage,qerrors,aerrors,qaskpage,tlinkpage
    this.state = { page: "loginpage", user: false };
    var statehandler = this.statehandler.bind(this);
  }

  statehandler(pageType, userType) {
    //alert('We pass argument from Child to Parent: ' + pageType);
    this.setState({ page: pageType, user: userType });
  }

  render() {
    var statehandler = this.statehandler;
    if (this.state.user) {
      return (
        <div>
          <Banner page={this.state.page} statehandler={statehandler.bind(this)} user={this.state.user}>  </Banner>
          <Mainbody page={this.state.page} statehandler={statehandler.bind(this)} user={this.state.user}> </ Mainbody>
        </div>
      );
    }
    else {
      return (
        <div>
          <Login page={this.state.page} statehandler={statehandler.bind(this)} user={this.state.user}> </Login>
        </div>
      )
    }
  }
}
