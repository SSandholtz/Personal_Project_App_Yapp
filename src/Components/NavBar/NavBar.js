import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './NavBar.css'
import { logout, checkSessionOnRefresh } from '../../ducks/accReducer'

class NavBar extends Component {

    constructor (props) {
        super (props)

        this.state = {
            app_logo: props.appReducer.app.app_logo,
            showDropDownMenu: false,
            showHam: true
        }
    }

    componentDidMount () {
        const { loggedIn } = this.props.accReducer.account
        console.log(loggedIn)
        if (!loggedIn) {
            this.props.checkSessionOnRefresh()
        }
    }

    handleNavBar (showDropDownMenu, showHam ) {
        this.setState({
            showDropDownMenu: !showDropDownMenu,
            showHam: !showHam
        })
    }

    handleLogout () {
        this.props.logout()
    }

    handleOnError() {
        this.setState({
            app_logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJftYqJsvhphX6OOjKMjbwllPKR70rAjXcpsP3tQ8XM7-tqRm4"
        })
    }

    render () {
        const { showDropDownMenu, showHam } = this.state
        const { loggedIn, company_logo, id } = this.props.accReducer.account
        return (
            <div className="navBar">
                <header>
                    <button onClick={() => this.handleNavBar(showDropDownMenu, showHam)} className="openClose" > {showHam ? <p className="menuButton"> &#9776; </p> : <p className="close"> &#10006; </p>} </button>
                    { loggedIn ?
                    <Link to={`/ProfilePage/${id}`} >
                        <div className="navBarCompanyLogoContainer">
                            <img className="navBarCompanyLogo" onError={() => this.handleOnError()} src={company_logo} alt=""></img>
                        </div>
                    </Link>
                    :
                    null
                    }
                    <div className="social-media">
{                    // eslint-disable-next-line
}                    <a target="_blank" title="follow me on facebook" href="https://www.facebook.com/PLACEHOLDER"><img alt="follow me on facebook" src="https://c866088.ssl.cf3.rackcdn.com/assets/facebook30x30.png" border={0}/></a>
{                    // eslint-disable-next-line
}                    <a target="_blank" title="follow me on Twitter" href="https://www.twitter.com/PLACEHOLDER"><img alt="follow me on Twitter" src="https://c866088.ssl.cf3.rackcdn.com/assets/twitter30x30.png" border={0}/></a>
                    {/* <p> github </p> */}
                    </div>
                </header>
                <div className={showDropDownMenu ? 'dropDownMenu slide' : 'dropDownMenu'} >
                    <section className="homeAndAccHomeContainer">
                    { 
                    !loggedIn ?
                    <Link to="/"  onClick={() => this.handleNavBar(showDropDownMenu, showHam)}>
                         Home
                    </Link> 
                    :
                    <div className="linkTextContainer">
                        <div className="linkText1">
                            <Link to="/"  onClick={() => this.handleNavBar(showDropDownMenu, showHam)}>
                                Home
                            </Link> 
                        </div>
                    <div className="lineContainer">
                        <line/>
                    </div>
                    
                        <div className="linkText2">
                            <Link to='/AccHomePage'  onClick={() => this.handleNavBar(showDropDownMenu, showHam)}>
                                Acc Home
                            </Link>
                        </div>
                    </div>
                    }
                    </section>

                    <line/>

                    {
                    !loggedIn ?
                    <Link to="/Login" onClick={() => this.handleNavBar(showDropDownMenu, showHam)}>
                        Login
                    </Link>
                    :
                    <Link to="/" className="logoutButton" onClick={() => {
                        this.handleLogout() 
                        this.handleNavBar(showDropDownMenu, showHam)
                        }}> 
                        Logout 
                    </Link>
                    }
                    <line/>
                    <Link to="/Register" onClick={() => this.handleNavBar(showDropDownMenu, showHam)}>
                        Register
                    </Link>
                    <line/>
                    <Link to="/AppIndex"  onClick={() => this.handleNavBar(showDropDownMenu, showHam)}>
                        App Index
                    </Link>
                </div>
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { logout, checkSessionOnRefresh }) (NavBar)