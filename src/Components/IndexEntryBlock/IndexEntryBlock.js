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
    
    render () {
        const { apps } = this.props.appReducer
        const Entries = apps.length ? apps.filter(app => app.app_name.charAt(0) === this.props.letter ).map(app => {
            return <IndexEntry app={app} />
        }) : null
        
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