import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './Login.css'
import { login } from '../../ducks/accReducer'
import Swal from 'sweetalert2';

class Login extends Component {

    constructor() {
        super ()

        this.state = {
            email: '',
            password: '',
            company_name: ''
        }
    }

    handleLogin (email, password, company_name) {
        if (email !== '' && password !== '' && company_name !== '') {
            this.props.login(email, password, company_name).then(() => {
                this.props.history.push(`/accHomePage`)
            })
        }
        else {
            Swal.fire({
                type: 'error',
                title: 'Error!',
                text: 'It Appears That One Or More Fields Is Empty.',
                timer: 4000
            })
        }
    }

    handleChange (value) {
        this.setState({
            email: value,
            company_name: value
        })
    }

    render () {
        const { email, password, company_name } = this.state
        return (
            <div className="loginContainer">
                <div className="mainTop">
                    <line/>
                    <div className="welcomeBack"> Welcome Back </div>
                    <line/>
                </div>
                <section className="inputContainer">
                    <input placeholder="Company or Email" type="text" onChange={(e) => this.handleChange(e.target.value)}></input>
                    <line/>
                    <input placeholder="Password" onChange={(e) => this.setState({password: e.target.value})} type="password" value={password}></input>
                    <line/>
                </section>
                <div className="loginButtonContainer">
                    <button className="loginButton" onClick={() => this.handleLogin(email, password, company_name)}> Log In </button>
                </div>
                <div className="sendToRegistration">
                    <line/>
                    <div className="noAccount"> Don't have an account? </div>
                    <line/>
                </div>
                <Link to="/Register">
                    <button className="sendToCreateAccountButton"> Create Account </button>
                </Link>
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { login }) (Login)