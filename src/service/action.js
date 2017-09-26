export const SET_USER_TYPE = 'SET_USER_TYPE';
export const STORE_NAVIGATOR = 'STORE_NAVIGATOR';
export const SET_WEEK = 'SET_WEEK';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_USER_REGISTER_INFO = 'SET_USER_REGISTER_INFO';

export function setUserType(userType){
    return {
        type: SET_USER_TYPE, 
        userType
    }
}

export function storeNavigator(navigator){
    return {
        type: STORE_NAVIGATOR,
        navigator
    }
}

export function setWeek(week){
    return {
        type: SET_WEEK,
        week
    }
}

export function setUsername(username){
    return {
        type: SET_USERNAME,
        username
    }
}

export function setUserRegisterInfo(userInfo){
    return {
        type: SET_USER_REGISTER_INFO,
        userInfo
    }
}