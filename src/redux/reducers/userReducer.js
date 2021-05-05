import {
    RECEIVE_LOGIN_SUCCESS,
    RECEIVE_LOGIN_FAILED,
    RECEIVE_LOGOUT,
    RECEIVE_GET_USER_SUCCESS,
    RECEIVE_GET_USER_FAILED,
    RECEIVE_GET_USER_LIST_SUC,
    RECEIVE_GET_USER_LIST_FAILED,
    RECEIVE_SHOW_FORM,

    RECEIVE_ADD_USER_SUC,
    RECEIVE_ADD_USER_FAIL,
    RECEIVE_UPDATE_USER_SUC,
    RECEIVE_UPDATE_USER_FAIL,
    RECEIVE_DELETE_USER_SUC,
} from '../actions_type'

const initUser = {
    _id:'',
    username:"",
    userList:[],
    roles:[],
    visibility:false
}

function user(state=initUser,action) {

    switch (action.type) {
        case RECEIVE_LOGIN_SUCCESS:
            return { ...action.data }
        case RECEIVE_LOGIN_FAILED:
            return { msg:action.data }
        case RECEIVE_GET_USER_SUCCESS:
            return action.data
        case RECEIVE_GET_USER_FAILED:
            return { msg:action.data }
        case RECEIVE_LOGOUT:
            return initUser
        case RECEIVE_GET_USER_LIST_SUC:
            const {users,roles} = action.data
            return {
                ...state,
                userList:users,
                roles
            }
        case RECEIVE_ADD_USER_SUC:
            return {
                ...state,
                visibility:false,
                userList:[...state.userList, action.data]
            }
        case RECEIVE_UPDATE_USER_SUC:
            const updateItem = action.data
            const userArr = [...state.userList]
            console.log(updateItem)
            userArr.forEach(( user, index ) => {
                if (user._id === updateItem._id){
                    userArr[index] = updateItem
                }
            })
            return {
                ...state,
                visibility:false,
                userList:userArr
            }
        case RECEIVE_DELETE_USER_SUC:
            const deleteItem = action.data
            const arr = [...state.userList]
            arr.forEach(( user, index ) => {
                if (user._id === deleteItem._id){
                    delete arr[index]
                }
            })
            return {
                ...state,
                userList:arr
            }
        case RECEIVE_SHOW_FORM:
            return {
                ...state,
                visibility:action.data
            }
        default:
            return state
    }
}

export default user