import React, { Component } from 'react'
import { connect } from 'react-redux'

import './AccHomePage.css'
import { showCreateAppFormDisplay, searchAccApps } from '../../ducks/accReducer'
import { searchApps } from '../../ducks/appReducer'
import AccApp from '../AccApp/AccApp.js'
import CreateAppForm from '../CreateAppForm/CreateAppForm.js';

class AccHomePage extends Component {

    componentDidMount () {
        this.props.searchAccApps()
    }

    componentDidUpdate (prevProps) {
        if (this.props.accReducer.newToCancel !== prevProps.accReducer.newToCancel) {
            this.props.searchAccApps()
        }
    }

    render () {
        const { createAppFormDisplay, newToCancel, } = this.props.accReducer
        const { accApps } = this.props.accReducer.account
        const Apps = accApps.length ? accApps.map(app => {
            return <AccApp app={app} />
        }) : null
        return (
            <div className="accHomeContainer">
            <div className="fillerContainer"></div>
                <h1> My Apps </h1>
                <button className="createButton" onClick={() => this.props.showCreateAppFormDisplay(createAppFormDisplay, newToCancel)}> { newToCancel ? <p> &#10010; </p> : <p> &#10006; </p>} </button>
                { createAppFormDisplay ?  
                <CreateAppForm /> : 
                null
                }
                {Apps}
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { showCreateAppFormDisplay, searchAccApps, searchApps }) (AccHomePage)