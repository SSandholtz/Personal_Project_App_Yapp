import axios from 'axios'
import Swal from 'sweetalert2';

const initialState = {
    loading: false,
    account: {
        id: 0,
        loggedIn: false,
        email: '',
        password: '',
        company_name: '',
        company_logo: '',
        accApps: []
    },
    createAppFormDisplay: false,
    newToCancel: true
}

function hasValidCompanyName(company_name) {
    let potentialCompanyName = company_name.split('')
    return potentialCompanyName.filter(character => character !== "" && character !== "@").length === potentialCompanyName.length
}

function hasValidEmail(email) {
    let potentialEmail = email.split('')
    return potentialEmail.includes('@')
}

const REGISTER = 'REGISTER'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const SEARCH_ACC_APPS = 'SEARCH_ACC_APPS'
const GET_ACC_INFO = 'GET_ACC_INFO'
const CHECK_SESSION = 'CHECK_SESSION'
const UPDATE_ACC_INFO = 'UPDATE_ACC_INFO'
const SHOW_CREATE_APP_FORM_DISPLAY = 'SHOW_CREATE_APP_FORM_DISPLAY'
const DELETE_APP = 'DELETE_APP'

export function register(email, password, company_name, company_logo) {
    const data = async () => {
        if (hasValidCompanyName(company_name) && hasValidEmail(email)) {
            const res = await axios.post('/auth/register', { email, password, company_name, company_logo })
            if (res.data.loggedIn) {
                localStorage.setItem('token', 'true')
                return res.data
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'Error!',
                    text: 'Registration Failed',
                    timer: 4000
                })
            }
        }
        else {
            Swal.fire({
                type: 'error',
                title: 'Error!',
                text: 'It Appears That An Entry Is Invalid.',
            })
        }
    }
    return {
        type: REGISTER,
        payload: data
    }
}

export function login(email, password, company_name) {
    const data = async () => {
        if (!company_name.includes('@')) {
            const res = await axios.post('/auth/login', { company_name, password })
            if (res.data.loggedIn) {
                localStorage.setItem('token', 'true')
                return res.data
            }
            else alert('Login Failed')
        }
        else {
            const res = await axios.post('/auth/login', { email, password })
            if (res.data.loggedIn) {
                localStorage.setItem('token', 'true')
                return res.data
            }
            else alert('Login Failed')
        }
    }
    return {
        type: LOGIN,
        payload: data
    }
}

export function logout() {
    let data = async () => {
        let res = await axios.post('/auth/logout')
        localStorage.removeItem('token')
        return res.data
    }
    return {
        type: LOGOUT,
        payload: data
    }
}

export function searchAccApps() {
    let data = axios.get(`/api/searchAccApps`).then(res => {
        return res.data
    })
    return {
        type: SEARCH_ACC_APPS,
        payload: data
    }
}

export function getAccInfo() {
    let user = axios.get('/api/getAccInfo').then(res => {
        return res.data
    })
    return {
        type: GET_ACC_INFO,
        payload: user
    }
}

export function updateAccInfo(email, company_logo) {
    let updatedUser = axios.put('/api/account', { email, company_logo }).then(res => {
        return res.data
    })
    return {
        type: UPDATE_ACC_INFO,
        payload: updatedUser
    }
}

export function checkSessionOnRefresh() {
    let user = axios.get('/api/session').then(res => {
        return res.data
    })
    return {
        type: CHECK_SESSION,
        payload: user
    }
}

export function showCreateAppFormDisplay(createAppFormDisplay, newToCancel) {
    return {
        type: SHOW_CREATE_APP_FORM_DISPLAY,
        payload: {
            createAppFormDisplay,
            newToCancel
        }
    }
}

export function deleteApp(app_id) {
    let data = axios.delete(`/api/accApp?app_id=${app_id}`).then(res => {
        return res.data
    })
    return {
        type: DELETE_APP,
        payload: data
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        // Register Account
        case REGISTER + '_PENDING':
            return { ...state, loading: true }
        case REGISTER + '_FULFILLED':
            return { ...state, loggedIn: action.payload, account: { ...state.account, ...action.payload }, loading: false }

        // Login Account
        case LOGIN + '_PENDING':
            return { ...state, loading: true }
        case LOGIN + '_FULFILLED':
            return { ...state, account: { ...state.account, ...action.payload, ...action.payload.userData }, loading: false }

        // Logout
        case LOGOUT + '_PENDING':
            return { ...state, loading: true }
        case LOGOUT + '_FULFILLED':
            return { ...state, loading: false, account: { ...state.account, loggedIn: action.payload.loggedIn } }

        // Retrieve Account's Apps
        case SEARCH_ACC_APPS + '_PENDING':
            return { ...state, loading: true }
        case SEARCH_ACC_APPS + '_FULFILLED':
            return { ...state, account: { ...state.account, accApps: [...action.payload] }, loading: false }

        // Retrieve Account Info
        case GET_ACC_INFO + '_PENDING':
            return { ...state, loading: true }
        case GET_ACC_INFO + '_FULFILLED':
            console.log(action.payload)
            return { ...state, account: { ...state.account, ...action.payload }, loading: false }

        // Update Account Info
        case UPDATE_ACC_INFO + '_PENDING':
            return { ...state, loading: true }
        case UPDATE_ACC_INFO + '_FULFILLED':
            return { ...state, account: { ...state.account, ...action.payload }, loading: false }

        // Check If Session
        case CHECK_SESSION + '_PENDING':
            return { ...state, loading: true }
        case CHECK_SESSION + '_FULFILLED':
            return { ...state, account: { ...state.account, ...action.payload }, loading: false }

        // Showing The Form To Create An App
        case SHOW_CREATE_APP_FORM_DISPLAY:
            return { ...state, createAppFormDisplay: !action.payload.createAppFormDisplay, newToCancel: !action.payload.newToCancel }

        // Delete App
        case DELETE_APP + '_PENDING':
            return { ...state, loading: true }
        case DELETE_APP + '_FULFILLED':
            return { ...state, account: { ...state.account, accApps: [ ...action.payload ]}, loading: false }
        default:
            return state
    }
}