module.exports = {
    createApp: async (req, res) => {
        const { app_name, app_logo, app_download_link } = req.body
        const { company_name } = req.session.user
        const upperCaseName = app_name.toUpperCase()
        const db = req.app.get('db')
        let app = await db.create_app([ company_name, upperCaseName, app_download_link, app_logo])
        res.status(200).send(app)
    },

    trackDownloads: async (req, res) => {
        const { app_id } = req.body
        const db = req.app.get('db')
        let downloads = await db.track_downloads([app_id])
        res.status(200).send(downloads)
    },

    getAppById: async (req, res) => {
        const { app_id } = req.query
        const db = req.app.get('db')
        let app = await db.get_app_by_id([app_id])
        res.status(200).send(app)
    },

    searchApps: async (req, res) => {
        const {app_name} = req.query
        let upperCaseName = app_name.toUpperCase()
        const db = req.app.get('db')
        let appsArr = await db.get_all_apps_alphabetical([`${upperCaseName}%`])
        res.status(200).send(appsArr)
    },

    getAllAppsStartingLetters: async (req, res) => {
        const db = req.app.get('db')
        let lettersArr = await db.get_all_app_starting_letters()
        let uniqueLettersArr = [...lettersArr[0].starting_letters]
        res.status(200).send(uniqueLettersArr)
    },

    getAppAnalytics: async (req, res) => {
        const { app_id } = req.query
        const db = req.app.get('db')
        let getAppAnalytics = await db.get_app_analytics([app_id])
        res.status(200).send(getAppAnalytics)
    },
    
    deleteApp: async (req, res) => {
        const { app_id } = req.query
        const db = req.app.get('db')
        let newAppsArr = await db.delete_app([app_id])
        res.status(200).send(newAppsArr)
    },
}