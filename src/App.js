import React, { Component } from 'react';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import LandingPage from './Components/LandingPage/LandingPage.js'
import Register from './Components/Register/Register.js'
import Login from './Components/Login/Login.js'
import AppIndex from './Components/AppIndex/AppIndex.js'
import AccHomePage from './Components/AccHomePage/AccHomePage.js'
import NavBar from './Components/NavBar/NavBar.js'
import DownloadPage from './Components/DownloadPage/DownloadPage.js'
import ProfilePage from './Components/ProfilePage/ProfilePage.js'
import AppAnalytics from './Components/AppAnalytics/AppAnalytics.js'
import './App.css';



class App extends Component {

  render() {
    let loadingAnimation = () => {
      if (this.props.accReducer.loading === true) {
        return (
          <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        )
      }
    }
    const { loggedIn } = this.props.accReducer.account
    return loggedIn ? (
      <Router>
        <NavBar/>
        <div className="loading">
          {loadingAnimation()}
        </div>
        <Switch >
          <Route path="/" exact component={LandingPage} />
          <Route path="/Register" component={Register} />
          <Route path="/Login" component={Login} />
          <Route path="/AppIndex" component={AppIndex} />
          <Route path="/AccHomePage" component={AccHomePage} />
          <Route path={`/DownloadPage/:id`} component={DownloadPage} />
          <Route path={`/ProfilePage/:id`} component={ProfilePage} />
          <Route path={`/AppAnalytics/:id`} component={AppAnalytics} />
        </Switch>
      </Router>
    ) : <Router>
    <NavBar/>
    <Switch >
      <Route path="/Register" component={Register} />
      <Route path="/Login" component={Login} />
      <Route path="/AppIndex" component={AppIndex} />
      <Route path={`/DownloadPage/:id`} component={DownloadPage} />
      <Route path={`/ProfilePage/:id`} component={ProfilePage} />
      <Route path={`/AppAnalytics/:id`} component={AppAnalytics} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState) (App);
