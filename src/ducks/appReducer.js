import axios from 'axios'

const initalState = {
    app: {
        app_id: 0,
        app_owner: '',
        app_name: '',
        app_logo: '',
        app_download_link: '',
        app_download_date: [],
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
const GET_ANALYTICS = 'GET_ANALYTICS'
const TRACK_DOWNLOADS = 'TRACK_DOWNLOADS'

export function createApp ( app_name, app_logo, app_download_link ) {
    let app = axios.post('/api/app', { app_name, app_logo, app_download_link } ).then(res => {
        return res.data
    })
    return {
        type: CREATE_APP,
        payload: app
    }
}

export function trackDownloads (app_id) {
    let downloads = axios.post('/api/downloads', { app_id }).then(res => {
        return res.data
    })
    return {
        type: TRACK_DOWNLOADS,
        payload: downloads
    }
}

export function getAppById (app_id) {
    let app = axios.get(`/api/getAppById?app_id=${app_id}`).then(res => {
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

export function getAppDownloads (app_id) {
    let data = axios.get(`api/analytics?app_id=${app_id}`).then(res => {
        return res.data
    })
    return {
        type: GET_ANALYTICS,
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

        // Track Downloads
        case TRACK_DOWNLOADS + '_PENDING':
            return { ...state, loading: true }
        case TRACK_DOWNLOADS + '_FULFILLED':
            return { ...state, }

        // Get App By ID
        case GET_APP_BY_ID + '_PENDING':
            return { ...state, loading: true }
        case GET_APP_BY_ID + '_FULFILLED':
            return { ...state, app: action.payload[0]  , loading: false }
        
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

        //Get App Analytics
        case GET_ANALYTICS + '_PENDING':
            return { ...state, loading: true }
        case GET_ANALYTICS + '_FULFILLED':
        console.log(action.payload)
            return { ...state, app: { ...state.app, app_download_date: [ ...action.payload ] }, loading: false }
        default:
            return state
    }
}