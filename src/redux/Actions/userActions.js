
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
    RECEIVE_DELETE_USER_FAIL
} from '../actions_type'

import {
    reqLogin,
    reqGetUser,
    reqGetUserList,
    reqAddUser,
    reqDeleteUser,
    reqUpdateUser
} from '../../api'


import { message } from 'antd'

const loginSuccess = (user) =>({ type:RECEIVE_LOGIN_SUCCESS,data:user })
const loginFailed = ( msg ) =>({type:RECEIVE_LOGIN_FAILED,data:msg})
const getUserSuccess = (user) => ({ type:RECEIVE_GET_USER_SUCCESS, data:user })
const getUserFailed = (msg) => ({ type:RECEIVE_GET_USER_FAILED, data:msg })
export const logout = () => ({ type: RECEIVE_LOGOUT,data:{}})
const getUserListSuc = (users) => ({ type:RECEIVE_GET_USER_LIST_SUC,data:users })
export const showForm = (visibility) => ({ type:RECEIVE_SHOW_FORM, data:visibility })

const addUserSuc = (user) => ({ type:RECEIVE_ADD_USER_SUC, data:user })
const addUserFail = (msg) => ({ type:RECEIVE_ADD_USER_FAIL, msg:msg })
const updateUserSuc = (user) => ({ type:RECEIVE_UPDATE_USER_SUC, data:user })
const updateUserFail = (msg) => ({ type:RECEIVE_UPDATE_USER_FAIL, msg:msg })
const deleteUserSuc = (deleteItem) => ({ type:RECEIVE_DELETE_USER_SUC, data:deleteItem })


export const login = (username,password) =>{
    return async dispatch =>{
        const result = await reqLogin(username,password)
        if (result.status === 0){
            dispatch(loginSuccess(result.data))
            message.success("登录成功",1)
        } else {
            dispatch(loginFailed({msg:result.msg}))
            message.error(result.msg,1)
        }

    }
}

export const getUser = () =>{
    return async dispatch =>{
        const result = await reqGetUser()
        if (result.status === 1){
            dispatch(getUserSuccess(result.data))
        }else {
            dispatch(getUserFailed(result.msg))
        }
    }
}

export const getUserList = () => {
    return async dispatch => {
        const result = await reqGetUserList()
        if (result.status === 0) {
            dispatch(getUserListSuc(result.data))
            return Promise.resolve(result.status)
        }
    }
}

export const addUser = (user) => {
    return async dispatch => {
        const result = await reqAddUser(user)
        if (result.status === 0) {
            dispatch(addUserSuc(result.data))
        }
    }
}
export const deleteUser = (userId) => {
    return async dispatch => {
        const result = await reqDeleteUser(userId)
        if (result.status === 0) {
            dispatch(deleteUserSuc(result.data))
        }
    }
}
export const updateUser = (user) => {
    return async dispatch => {
        const result = await reqUpdateUser(user)
        if (result.status === 0) {
            dispatch(updateUserSuc(result.data))
        }
    }
}
