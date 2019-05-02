import React, { Component } from 'react'
import { connect } from 'react-redux'

import './IndexEntryBlock.css'
import { getAllAppStartingLetters, searchApps } from '../../ducks/appReducer'
import IndexEntry from '../IndexEntry/IndexEntry';

class IndexEntryBlock extends Component {
    constructor (props) {
        super (props)

        this.state = {
            letter: props.letter,
        }
    }

    filterApps (apps) {
        let filteredApps = []
        for (let i = 0; i < apps.length; i++) {
            if (apps[i].visibility) {
                filteredApps.push(apps[i])
                return filteredApps
            }
        }
    }
    
    render () {
        const { apps } = this.props.appReducer
        const Entries = apps.length ? apps.filter(app => app.app_name.charAt(0) === this.props.letter && app.visibility ).map(app => {
            return <IndexEntry app={app} />
        }) : null
        console.log(apps)
        return (
            <div className="indexEntryBlock">
                <h1 className="blockLetter"> {this.state.letter} </h1>
                    { Entries }
                <line className="blockDivider" />
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState

export default connect (mapState, { getAllAppStartingLetters, searchApps }) (IndexEntryBlock)