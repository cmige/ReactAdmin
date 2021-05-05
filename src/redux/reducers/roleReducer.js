import {
    RECEIVE_GET_ROLE_LIST_SUC,
    RECEIVE_GET_ROLE_LIST_FAIL,
    RECEIVE_SET_ROLE,
    RECEIVE_SHOW_FORM,
    RECEIVE_ADD_ROLE_SUC,
    RECEIVE_ADD_ROLE_FAIL,
    RECEIVE_UPDATE_ROLE_SUC,
    RECEIVE_UPDATE_ROLE_FAIL
} from '../actions_type'


const initRole = {
    roleList:[],
    selectRole:{},
    visibility:0
}


export default function role(state=initRole,action) {
    switch (action.type) {
        case RECEIVE_GET_ROLE_LIST_SUC:
            return {
                ...state,
                roleList:action.data
            }
        case RECEIVE_SET_ROLE:
            return {
                ...state,
                selectRole:action.data
            }
        case RECEIVE_SHOW_FORM:
            return{
                ...state,
                visibility:action.data
            }
        case RECEIVE_ADD_ROLE_SUC:
            return {
                ...state,
                visibility:0,
                roleList:[...state.roleList,action.data]
            }
        case RECEIVE_UPDATE_ROLE_SUC:
            const role = action.data
            const arr = [...state.roleList]
            arr.forEach((item,index) => {
                if (item._id === role._id) {
                    arr[index] = role
                }
            })
            return {
                ...state,
                visibility:0,
                roleList: arr
            }
        default:
            return state
    }
}