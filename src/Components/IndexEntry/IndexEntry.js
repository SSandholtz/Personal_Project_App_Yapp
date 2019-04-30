import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './IndexEntry.css'
import { searchApps } from '../../ducks/appReducer'

class IndexEntry extends Component {
    constructor (props) {
        super (props)

        this.state = {
            app_name: props.app.app_name
        }
    }

    render () {
        const { app_id, app_name } = this.props.app
        return (
            <div className="entryContainer">
                <Link to={`/DownloadPage/${app_id}`}>
                    {app_name}
                </Link>
                {/* <line /> */}
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState

export default connect (mapState, searchApps) (IndexEntry)