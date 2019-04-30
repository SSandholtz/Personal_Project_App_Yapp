import React, { Component } from 'react'
import { connect } from 'react-redux'

import './ProfilePage.css'
import { getAccInfo, updateAccInfo } from '../../ducks/accReducer'

class ProfilePage extends Component {
    constructor (props) {
        super (props)

        this.state = {
            email: props.accReducer.account.email,
            company_logo: props.accReducer.account.company_logo,
            potentialLogo: '',
            edit: false
        }
    }

    componentDidMount () {
        this.props.getAccInfo()
    }

    handleOnError() {
        this.setState({
            company_logo: "https://www.in-bioinnovation.org/wp-content/uploads/2016/02/no-image-found-300x300.jpg"
        })
    }

    handleEdit () {
        this.setState({
            edit: !this.state.edit
        })
    }

    handleSubmitEdit (email, company_logo) {
        this.props.updateAccInfo(email, company_logo)
        this.handleEdit()
    }
    
    render () {
        const { potentialLogo, company_logo, email, edit } = this.state
        return (
            <div className="backgroundProfilePageContainer">
            <div className="profilePageContainer">
                <h1> Account Info </h1>
                <div className="companyLogoContainer">
                    <img className="companyLogo" onError={() => this.handleOnError()} src={company_logo} alt=""/>
                </div>
                { edit ?
                <button className="cancel" onClick={() => this.handleEdit()}> &#10006; </button>
                :
                null
                }
                <section className="accountInfoContainer">
                    <div className="detailNamesContainer">
                        <p> Company Email: </p>
                        <p> Company Logo: </p>
                    </div>
                        { edit ?
                        <div className="inputUpdateContainer">
                            <input onChange={(e) => this.setState({ email: e.target.value })} value={email}></input>
                            <input onChange={(e) => this.setState({ potentialLogo: e.target.value })} value={potentialLogo}></input>
                        </div>
                        :
                        <div className="inputUpdateContainer">
                            <h1> {email} </h1>
                            <h1> {company_logo} </h1>
                        </div>
                        }
                </section>
                { edit ?
                <button className="editSubmitButton" onClick={() => this.handleSubmitEdit(email, company_logo)}> Submit </button>
                :
                <button className="editSubmitButton" onClick={() => this.handleEdit()}> Edit </button>
                }
            </div>
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState

export default connect (mapState, { getAccInfo, updateAccInfo } ) (ProfilePage)