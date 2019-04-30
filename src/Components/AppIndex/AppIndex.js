import React, { Component } from 'react'
import { connect } from 'react-redux'

import './AppIndex.css'
import { searchApps, getAllAppStartingLetters } from '../../ducks/appReducer'
import IndexEntryBlock from '../IndexEntryBlock/IndexEntryBlock.js'

class AppIndex extends Component {
    constructor () {
        super ()

        this.state = {
            app_name: '',
        }
    }
    
    componentDidMount () {
        this.props.getAllAppStartingLetters()
        this.props.searchApps(this.state.app_name) 
    }
    
    componentDidUpdate ( prevProps, prevState) {
        if (this.state.app_name !== prevState.app_name) {
            if (this.state.app_name === '') {
                this.props.searchApps(this.state.app_name)
            }
        }
    }
    
    handleFilter (value, app_name) {
        this.setState({app_name: value})
        this.props.searchApps(app_name)
    }

    createBlocks (app_name, startingLetters) {
        if (app_name === '') {
            const EntryBlocks = startingLetters.length ? startingLetters.map(letter => {
                return <IndexEntryBlock key={letter} letter={letter} />
            }) : null
            return EntryBlocks
        }
        else {
            const EntryBlocks = startingLetters.length ? startingLetters.filter(letter => letter === app_name.charAt(0)).map((letter) => {
                return <IndexEntryBlock key={letter} letter={letter} />
            }) : null
            return EntryBlocks
        }
    }

    render () {
        const { app_name } = this.state
        const { startingLetters } = this.props.appReducer
        return (
            <div className="appIndexContainer">
                <h1 className="headerContainer"> App Index </h1>
                <input className="searchBar" placeholder="Filter (Alphabetical)" onChange={(e) => this.handleFilter(e.target.value, app_name) } type="text" value={app_name}></input>
                <line/>
                { this.createBlocks(app_name, startingLetters) }
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { searchApps, getAllAppStartingLetters }) (AppIndex)