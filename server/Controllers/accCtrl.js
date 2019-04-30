module.exports = {
    searchAccApps: async (req, res) => {
        let { company_name } = req.session.user
        const db = req.app.get('db')
        let accAppsArray = await db.get_all_apps_by_acc([company_name])
        res.status(200).send(accAppsArray)
    },

    getAccInfo: async (req, res) => {
        let { company_name } = req.session.user
        const db = req.app.get('db')
        let accInfo = await db.get_acc_info([company_name])
        res.status(200).send(accInfo)
    },

    updateAccInfo: async (req, res) => {
        let { email, company_logo } = req.body
        let { id } = req.session.user
        const db = req.app.get('db')
        let newAccInfo = await db.update_acc_info([email, company_logo, id])
        console.log(newAccInfo)
        res.status(200).send(newAccInfo)
    }
}