import axios from 'axios'

const initalState = {
    app: {
        app_id: 0,
        app_owner: '',
        app_name: '',
        app_logo: '',
        app_download_link: '',
        app_private: true,
        app_feedback: '',
    },
    apps: [],
    startingLetters: [],
    loading: false,
    editAppInfo: false
}

const CREATE_APP = 'CREATE_APP'
const GET_APP_BY_ID = 'GET_APP_BY_ID'
const SEARCH_APPS = 'SEARCH_APPS'
const GET_ALL_APP_STARTING_LETTERS = 'GET_ALL_APP_STARTING_LETTERS'

export function createApp ( app_name, app_logo, app_download_link ) {
    let app = axios.post('/api/app', { app_name, app_logo, app_download_link } ).then(res => {
        return res.data
    })
    return {
        type: CREATE_APP,
        payload: app
    }
}

export function getAppById () {
    let app = axios.get('/api/getAppById').then(res => {
        return res.data
    })
    return {
        type: GET_APP_BY_ID,
        payload: app
    }
}

export function searchApps (app_name) {
    let data = axios.get(`/api/searchApps?app_name=${app_name}`).then(res => {
        return res.data
    })
    return {
        type: SEARCH_APPS,
        payload: data
    }
}

export function getAllAppStartingLetters () {
    let data = axios.get('/api/getAllAppStartingLetters').then(res => {
        return res.data
    })
    return {
        type: GET_ALL_APP_STARTING_LETTERS,
        payload: data
    }
}

export default function reducer (state = initalState, action) {
    switch (action.type) {
        
        // Create An App
        case CREATE_APP + '_PENDING':
            return { ...state, loading: true }
        case CREATE_APP + '_FULFILLED':
            return { ...state, app: { ...state.app, ...action.payload[0] }, apps: [...state.apps, ...action.payload], loading: false }
        
        // Search All Apps
         case SEARCH_APPS + '_PENDING':
            return { ...state, loading: true }
        case SEARCH_APPS + '_FULFILLED':
            return { ...state, apps: [ ...action.payload ], loading: false }

        // Retrieve Starting Letters Of App Names
        case GET_ALL_APP_STARTING_LETTERS + '_PENDING':
            return { ...state, loading: true }
        case GET_ALL_APP_STARTING_LETTERS + '_FULFILLED':
            return { ...state, startingLetters: [ ...action.payload ], loading: false }
        default:
            return state
    }
}