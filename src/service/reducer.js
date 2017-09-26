import { SET_USER_TYPE, STORE_NAVIGATOR, SET_WEEK, SET_USERNAME, SET_USER_REGISTER_INFO } from './action';
import { combineReducers } from 'redux';

function setUserType(state = '', action) {
    switch (action.type) {
        case SET_USER_TYPE: {
            return { userType: action.userType };
        }
        default: {
            return state;
        }
    }
}

function storeNavigator(state = null, action) {
    switch (action.type) {
        case STORE_NAVIGATOR: {
            return { navigator: action.navigator };
        }
        default: {
            return state;
        }
    }
}

function setWeek(state = { week: 1 }, action) {
    switch (action.type) {
        case SET_WEEK: {
            return { week: action.week }
        }
        default: {
            return state
        }
    }
}

function setUsername(state = 'none', action) {
    switch (action.type) {
        case SET_USERNAME: {
            return { username: action.username }
        }
        default: {
            return state
        }
    }
}

function userRegisterInfo(state = null, action) {
    switch (action.type) {
        case SET_USER_REGISTER_INFO: {
            return action.userInfo;
        }
        default: {
            return state;
        }
    }
}

const sehatiApp = combineReducers({
    setUserType,
    storeNavigator,
    setWeek,
    setUsername,
    userRegisterInfo
});

export default sehatiApp;