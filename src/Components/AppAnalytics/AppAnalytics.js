import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'

import './AppAnalytics.css'
import { getAppDownloads } from '../../ducks/appReducer'

class AppAnalytics extends Component {
    constructor () {
        super ()

        this.state = {
            downloads: []
        }
    }

    componentDidMount () {
        this.props.getAppDownloads(this.props.match.params.id)
    }

    render () {
        return (
            <div className="appAnalyticsContainer">
                <button onClick={() => this.props.history.goBack()} className="backToDownloadButton"> Back To Download Page </button>
                <div className="graphContainer">
                <Line
                data={{labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                datasets:[
                  {
                    label:'Downloads by Month',
                    data:[
                        13,
                        70,
                        34,
                        16,
                        90,
                        40,
                        89,
                        100,
                        110,
                        120,
                        67,
                        6
                    ],
                    pointBackgroundColor: '#3366cc',
                    borderColor: 'rgb(0, 0, 0, .2)'
                  }
                ]
              }}
              options={{
                title:{
                  display:true,
                  text:'Downloads by Month',
                  fontSize:25,
                  fontColor: '#000'
                },
                legend:{
                  display:false,
                  position:'left',
                  labels: {fontColor: '#000'}
                }
              }}
                />
                </div>
                    <h1> Weekly Newsletter </h1>
                <div className="weeklyNewsletter">
                    <div className="allNews">
                        <div className="news">
                            <div className="dot"></div>
                            <h3> 
                                This week we updated the yeet feature to a full yeet from a half. 
                                Our next patch will include a feature for everyone to create and edit their own yeet.
                            </h3>
                        </div>
                        <div className="lineBox">
                            <line/>
                        </div>
                        <div className="news">
                            <div className="dot"></div>
                            <h3> 
                                This week we updated the yeet feature to a full yeet from a half. 
                                Our next patch will include a feature for everyone to create and edit their own yeet.
                            </h3>
                        </div>
                        <div className="lineBox">
                            <line/>
                        </div>
                        <div className="news">
                            <div className="dot"></div>
                            <h3> 
                                This week we updated the yeet feature to a full yeet from a half. 
                                Our next patch will include a feature for everyone to create and edit their own yeet.
                            </h3>
                        </div>
                        <div className="lineBox">
                            <line/>
                        </div>
                        <div className="news">
                            <div className="dot"></div>
                            <h3> 
                                This week we updated the yeet feature to a full yeet from a half. 
                                Our next patch will include a feature for everyone to create and edit their own yeet.
                            </h3>
                        </div>
                        <div className="lineBox">
                            <line/>
                        </div>
                        <div className="news">
                            <div className="dot"></div>
                            <h3> 
                                This week we updated the yeet feature to a full yeet from a half. 
                                Our next patch will include a feature for everyone to create and edit their own yeet.
                            </h3>
                        </div>
                        <div className="lineBox">
                            <line/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (reduxState) => reduxState

export default connect ( mapState, { getAppDownloads } ) ( AppAnalytics )