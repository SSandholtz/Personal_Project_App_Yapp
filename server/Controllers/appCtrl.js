module.exports = {
    createApp: async (req, res) => {
        let { app_name, app_logo, app_download_link } = req.body
        let { company_name } = req.session.user
        let upperCaseName = app_name.toUpperCase()
        const db = req.app.get('db')
        let app = await db.create_app([ company_name, upperCaseName, app_download_link, app_logo])
        res.status(200).send(app)
    },

    getAppById: async (req, res) => {
        const db = req.app.get('db')
        let app = await db.get_app_by_id([id])
        res.status(200).send(app)
    },

    searchApps: async (req, res) => {
        let {app_name} = req.query
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
    
    deleteApp: 2,
}