import React, { Component } from 'react'
import { connect } from 'react-redux';

import './DownloadPage.css'
import { getAppById } from '../../ducks/appReducer'

class DownloadPage extends Component {
    constructor (props) {
        super (props)

        this.state = {
            app_logo: props.appReducer.app.app_logo
        }
    }
    
    componentDidMount () {
        this.props.getAppById()
    }

    handleOnError() {
        this.setState({
            app_logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJftYqJsvhphX6OOjKMjbwllPKR70rAjXcpsP3tQ8XM7-tqRm4"
        })
    }

    render () {
        const { app_logo } = this.state
        const { app_name, app_id } = this.props.appReducer.app
        return (
            <div className="downloadPageContainer">
                <h1> {`${app_name}`} Download Page  </h1>
                <img 
                className="appLogo" 
                onError={() => this.handleOnError()}
                src={app_logo} 
                alt="">
                </img>
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState

export default connect (mapState, { getAppById } ) (DownloadPage)