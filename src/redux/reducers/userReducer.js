import {
    RECEIVE_LOGIN_SUCCESS,
    RECEIVE_LOGOUT,
    RECEIVE_GET_USER_LIST_SUC,
    RECEIVE_SHOW_FORM,
    RECEIVE_ADD_USER_SUC,
    RECEIVE_UPDATE_USER_SUC,
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
        case RECEIVE_LOGIN_SUCCESS:         // receive_login_success
            return { ...action.data }

        case RECEIVE_LOGOUT:                // receive_logout
            return initUser
        case RECEIVE_GET_USER_LIST_SUC:     // receive_get_user_list_suc
            const {users,roles} = action.data
            return {
                ...state,
                userList:users,
                roles
            }
        case RECEIVE_ADD_USER_SUC:          // receive_add_user_suc
            return {
                ...state,
                visibility:false,
                userList:[...state.userList, action.data]
            }
        case RECEIVE_UPDATE_USER_SUC:       // receive_update_user_suc
            const updateItem = action.data
            const userArr = [...state.userList]
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
        case RECEIVE_DELETE_USER_SUC:       // receive_delete_user_suc
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
        case RECEIVE_SHOW_FORM:             // receive_show_form
            return {
                ...state,
                visibility:action.data
            }
        default:
            return state
    }
}

export default user