import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './AccApp.css'

class AccApp extends Component {
    constructor (props) {
        super (props)

        this.state = {
            publicOrPrivate: false,
            app_logo: props.appReducer.app.app_logo
        }
    }

    handleOnError() {
        this.setState({
            app_logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJftYqJsvhphX6OOjKMjbwllPKR70rAjXcpsP3tQ8XM7-tqRm4"
        })
    }

    render () {
        const { publicOrPrivate, app_logo } =  this.state
        const { app_name, app_id } = this.props.app
        return (
            <section className="backgroundContainer">
                <div className="accAppContainer">
        
                    <p className="appName"> {app_name} </p>
                    <line className="underline"/>
                        <Link to={`/Download/${app_id}`}>
                            <div className="accAppImgLinkContainer">
                                    <img
                                        className="appLogo"
                                        onError={() => this.handleOnError()}
                                        src={app_logo}
                                    />
                            </div>
                        </Link>
                    <div className="accAppButtonsContainer">
                        <button
                            className="accAppButtons"
                            onClick={() => this.setState({publicOrPrivate: !publicOrPrivate})}
                        >
                            { publicOrPrivate ? 'Public' : 'Private'}
                        </button>
                        <button className="accAppButtons"> Delete </button>
                    </div>
                    <div className="deleteConfirmationContainer"></div>
                </div>
            </section>
        )
    }
}

const mapState = (reduxState) => reduxState

export default connect(mapState) (AccApp)