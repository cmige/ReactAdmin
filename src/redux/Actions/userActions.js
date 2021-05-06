
import {
    RECEIVE_LOGIN_SUCCESS,      // receive_login_success
    RECEIVE_LOGOUT,             // receive_logout
    RECEIVE_GET_USER_LIST_SUC,  // receive_get_user_list_suc
    RECEIVE_SHOW_FORM,          // receive_show_form
    RECEIVE_ADD_USER_SUC,       // receive_add_user_suc
    RECEIVE_UPDATE_USER_SUC,    // receive_update_user_suc
    RECEIVE_DELETE_USER_SUC,    // receive_delete_user_suc
} from '../actions_type'

import {
    reqLogin,
    reqGetUserList,
    reqAddUser,
    reqDeleteUser,
    reqUpdateUser
} from '../../api'

export const logout = () => ({ type: RECEIVE_LOGOUT,data:{}})
export const showForm = (visibility) => ({ type:RECEIVE_SHOW_FORM, data:visibility })

const loginSuccess = (user) =>({ type:RECEIVE_LOGIN_SUCCESS,data:user })
const getUserListSuc = (users) => ({ type:RECEIVE_GET_USER_LIST_SUC,data:users })
const addUserSuc = (user) => ({ type:RECEIVE_ADD_USER_SUC, data:user })
const updateUserSuc = (user) => ({ type:RECEIVE_UPDATE_USER_SUC, data:user })
const deleteUserSuc = (deleteItem) => ({ type:RECEIVE_DELETE_USER_SUC, data:deleteItem })


export const login = (username,password) =>{
    return async dispatch =>{
        const result = await reqLogin(username,password)
        console.log(result)
        if (result.status === 0){
            dispatch(loginSuccess(result.data))
            return Promise.resolve({status:0,content:'登录成功'})
        } else {
            return Promise.resolve({status:1,content:result.msg})
        }

    }
}

export const getUserList = () => {
    return async dispatch => {
        const result = await reqGetUserList()
        if (result.status === 0) {
            dispatch(getUserListSuc(result.data))
            return Promise.resolve({status:0,content:'获取用户列表成功'})
        }else {
            return Promise.resolve({status:1,content:'获取用户列表异常，请重新尝试'})
        }
    }
}

export const addUser = (user) => {
    return async dispatch => {
        const result = await reqAddUser(user)
        if (result.status === 0) {
            dispatch(addUserSuc(result.data))
            return Promise.resolve({status:0,content:`添加用户成功`})
        }else {
            return Promise.resolve({status:1,content:result.msg})
        }
    }
}
export const deleteUser = (userId) => {
    return async dispatch => {
        const result = await reqDeleteUser(userId)
        if (result.status === 0) {
            dispatch(deleteUserSuc(result.data))
            return Promise.resolve({status:0,content:`删除${result.data.username}成功`})
        }else {
            return Promise.resolve({status:1,content:result.msg})
        }
    }
}
export const updateUser = (user) => {
    return async dispatch => {
        const result = await reqUpdateUser(user)
        if (result.status === 0) {
            dispatch(updateUserSuc(result.data))
            return Promise.resolve({ status:0,content:`更新${result.data.username}用户成功` })
        }else {
            return Promise.resolve({status:1,content:result.msg})
        }
    }
}
