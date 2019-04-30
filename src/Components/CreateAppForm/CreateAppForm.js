import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showCreateAppFormDisplay, searchAccApps } from '../../ducks/accReducer.js'
import { createApp } from '../../ducks/appReducer.js'
import Swal from 'sweetalert2'


import './CreateAppForm.css'

class CreateAppForm extends Component {
    constructor () {
        super ()

        this.state = {
            app_name: '',
            app_logo: '',
            potentialLogo: '',
            app_download_link: '',
        }
    }

    createAppStuffs = (app_name, app_logo, app_download_link, createAppFormDisplay, newToCancel) => {
        if (app_name !== '' && app_logo !== '' && app_download_link !== '') {
        this.props.createApp(app_name, app_logo, app_download_link)
        this.props.showCreateAppFormDisplay(createAppFormDisplay, newToCancel)
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
        const { app_name, app_logo, app_download_link, potentialLogo } = this.state
        const { createAppFormDisplay, newToCancel } = this.props.accReducer
        return (
            <div className="createFormContainer">
                <input
                placeholder="App Name"
                onChange={(e) => this.setState({ app_name: e.target.value })} 
                value={app_name}>
                </input>

                <line />

                <input 
                placeholder="App Logo"  
                onChange={(e) => this.setState({ potentialLogo: e.target.value })} 
                value={app_logo}>
                </input>

                <line />

                <input 
                placeholder="App Download Link/File"  
                onChange={(e) => this.setState({ app_download_link: e.target.value })} 
                value={app_download_link}>
                </input>

                <line />

                <button 
                className="createAppButton" 
                onClick={() => this.createAppStuffs(app_name, app_logo, app_download_link, createAppFormDisplay, newToCancel)}>
                Create App 
                </button>
                
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { showCreateAppFormDisplay, createApp, searchAccApps }) (CreateAppForm)