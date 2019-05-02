require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./Controllers/authCtrl')
const accCtrl = require('./Controllers/accCtrl')
const appCtrl = require('./Controllers/appCtrl')


const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const app = express()

massive(CONNECTION_STRING).then(db =>{
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
        console.log('Listening on PORT', SERVER_PORT)
    })
})

app.use( express.static(`${__dirname}/../build`) )
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.post('/auth/login', authCtrl.login)
app.post('/api/app', appCtrl.createApp)
app.post('/auth/logout', authCtrl.logout)
app.post('/auth/register', authCtrl.register)
app.post('/api/downloads', appCtrl.trackDownloads)
// app.post('/api/feedback', appCtrl.addFeedback)

app.get('/api/searchApps', appCtrl.searchApps)
app.get('/api/searchAccApps', accCtrl.searchAccApps)
app.get('/api/getAccInfo', accCtrl.getAccInfo)
app.get('/api/getAppById', appCtrl.getAppById)
app.get('/api/session', accCtrl.checkSessionOnRefresh)
app.get('/api/analytics', appCtrl.getAppAnalytics)
app.get('/api/getAllAppStartingLetters', appCtrl.getAllAppsStartingLetters)

app.put('/api/account', accCtrl.updateAccInfo)
app.put('/api/app', appCtrl.changePrivacy)
// app.put('/api/feedback', appCtrl.updateFeedback)

app.delete(`/api/accApp`, appCtrl.deleteApp)
// app.delete('/api/feedback', appCtrl.deleteFeedback)