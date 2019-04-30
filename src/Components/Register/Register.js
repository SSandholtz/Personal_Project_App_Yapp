import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Register.css'
import { register } from '../../ducks/accReducer'
import Swal from 'sweetalert2';

class Register extends Component {
    constructor (props) {
        super (props)

        this.state = {
            email: '',
            password: '',
            company_name: '',
            company_logo: ''
        }
    }

    handleRegister(email, password, company_name, company_logo) {
        if (email !== '' && password !== '' &&  company_name !== '') {
            this.props.register(email, password, company_name, company_logo).then(res => {
                if (this.props.accReducer.account.loggedIn) {
                    this.props.history.push(`/accHomePage`)
                }
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

    render () {
        const { company_logo, company_name, email, password } = this.state
        return (
            <div className="registerContainer">
                <div className="companyLogoContainer">
                    <img className="companyLogo" src={company_logo ? company_logo : "https://www.in-bioinnovation.org/wp-content/uploads/2016/02/no-image-found-300x300.jpg"} alt=""/>
                </div>
                <h1 className="required"> * Required Fields</h1>
                <div className="inputsContainer">
                    <input placeholder="Company Logo" onChange={(e) => this.setState({company_logo: e.target.value})} value={company_logo}></input>
                    <line/>
                    <input placeholder="*   Company (No @s)" onChange={(e) => this.setState({company_name: e.target.value})} value={company_name}></input>
                    <line/>
                    <input placeholder="*   Company Email" onChange={(e) => this.setState({email: e.target.value})} value={email}></input>
                    <line/>
                    <input placeholder="*   Password" onChange={(e) => this.setState({password: e.target.value})} value={password}></input>
                    <line/>
                </div>
                    <button className="registerButton" onClick={() => this.handleRegister(email, password, company_name, company_logo)} > Create Account  </button>
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { register }) (Register)