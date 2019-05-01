import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './LandingPage.css'

export default class LandingPage extends Component {
    
    render () {
        return (
            <div className="app">
                <div className="main">
                    <section className="welcome">
                        <h1 className="introTitle"> App Yapp </h1>
                        <span>
                            Developer to Developer Feedback
                        </span>
                        <div className="main-page-buttons">
                        <Link to="/Login">
                            <button> Login </button>
                        </Link>
                        <Link to="/Register">
                            <button> Register </button>
                        </Link>
                        </div>
                    </section>
                </div>
                <div className="divider"></div>
                <div className="lowerBackgroundContainer">
                    <section className="about">
                        <h1> About </h1>
                        <line/>
                        <span> We Let developers do things by communicating with other developers and yeah stuff like that. Go do some stuff. </span>
                    </section>
                </div>
            </div>
        )
    }
}