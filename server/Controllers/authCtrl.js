const bcrypt = require('bcryptjs')

module.exports = {
    login: async (req, res) => {
        const { email, password, company_name } = req.body
        const db = req.app.get('db')
        let accountArr = await db.find_acc_by_company_name_or_email([company_name, email])
        if (accountArr.length === 0) {
            return res.status(401).send({message: 'Account not found'})
        }
        else {
            const result = await bcrypt.compareSync(password, accountArr[0].acc_hash)
            if (!result) {
                return res.status(401).send({message: 'Incorrect Password'})
            }
            else { 
            req.session.user = { email: accountArr[0].acc_email, company_name: accountArr[0].company_name, company_logo: accountArr[0].company_logo, id: accountArr[0].acc_id}
            res.status(200).send({
                message: 'Logged in successfully.',
                userData: req.session.user,
                loggedIn: true
            })
        }
        }
    },

    register: async (req, res) => {
        const { email, password, company_name, company_logo } = req.body
        const db = req.app.get('db')
        const accountArr = await db.find_acc_by_email_and_company_name([email, company_name])
        if (accountArr[0]) {
            return res.status(200).send({message: 'There is already an account with this Email and/or Company Name.'})
        }
        else {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            let newAccArr = await db.create_acc([email, hash, company_name, company_logo])
            req.session.user = {email: newAccArr[0].acc_email, company_name: newAccArr[0].company_name, company_logo: newAccArr[0].company_logo, id: newAccArr[0].acc_id}
            res.status(200).send({
                message: 'Logged in',
                userData: req.session.user,
                loggedIn: true
            })
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send({
            message: 'logged out',
            loggedIn: false
        })
    }
}

