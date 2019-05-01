import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './IndexEntry.css'
import { searchApps } from '../../ducks/appReducer'

class IndexEntry extends Component {

    render () {
        const { app_id, app_name } = this.props.app
        return (
            <div className="entryContainer">
                <Link to={`/DownloadPage/${app_id}`}>
                    {app_name}
                </Link>
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState

export default connect (mapState, searchApps) (IndexEntry)