import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import './DownloadPage.css'
import { getAppById, trackDownloads } from '../../ducks/appReducer'

class DownloadPage extends Component {
    constructor (props) {
        super (props)

        this.state = {
            app_id: 0,
            app_logo: '',
            app_name: '',
            app_owner: '',
            app_download_link: ''
        }
    }
    
    async componentDidMount() {
        await this.props.getAppById(this.props.match.params.id)
        const { app_logo, app_name, app_owner, app_download_link, app_id } = this.props.appReducer.app
        this.setState ({
            app_logo,
            app_name,
            app_owner,
            app_download_link,
            app_id
        })
    }

    handleClickCount () {
        this.props.trackDownloads(this.props.match.params.id)
    }

    handleOnError() {
        this.setState({
            app_logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJftYqJsvhphX6OOjKMjbwllPKR70rAjXcpsP3tQ8XM7-tqRm4"
        })
    }

    render () {
        const { app_logo, app_name, app_owner, app_id } = this.state
        return (
            <div className="downloadPageBackgroundContainer">
                <div className="downloadPageContainer">
                    <h1> {`${app_name} Download Page`} </h1>
                    <h3> {`Created By ${app_owner}`}</h3>
                    <div className="appLogoContainer">
                        <img 
                        className="appLogo" 
                        onError={() => this.handleOnError()}
                        src={app_logo} 
                        alt="">
                        </img>
                    </div>
                    <button className="downloadButton" onClick={() => this.handleClickCount()}> Download </button>
                    <line/>
                    <div>
                        <Link to={`/AppAnalytics/${app_id}`}> 
                            <button className="analyticsButton"> App Analytics/Newsletter </button> 
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState

export default connect (mapState, { getAppById, trackDownloads } ) (DownloadPage)