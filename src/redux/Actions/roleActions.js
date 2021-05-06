import {
    RECEIVE_GET_ROLE_LIST_SUC,
    RECEIVE_SET_ROLE,
    RECEIVE_SHOW_FORM,
    RECEIVE_ADD_ROLE_SUC,
    RECEIVE_UPDATE_ROLE_SUC,
} from '../actions_type'

import {
    reqGetRoleList,
    reqAddRole,
    reqUpdateRole
} from '../../api'

import {} from 'antd'

const getRoleListSuc = (roleList) => ({ type:RECEIVE_GET_ROLE_LIST_SUC,data:roleList })
export const selectRole = (role) => ({ type:RECEIVE_SET_ROLE,data:role })
export const showForm = (visibility) => ({type:RECEIVE_SHOW_FORM,data:visibility})
const addRoleSuc = (role) => ({ type:RECEIVE_ADD_ROLE_SUC, data:role })
const updateRoleSuc = (role) => ({ type:RECEIVE_UPDATE_ROLE_SUC,data:role })

export const getRoleList = () => {
    return async dispatch => {
        const result = await reqGetRoleList()
        if (result.status === 0) {
            dispatch(getRoleListSuc(result.data))
            return Promise.resolve({ status:0,content:`获取角色列表成功` })
        } else {
            return Promise.resolve({ status:1,content:result.msg })
        }
    }
}

export const addRole = (roleName) => {
    return async dispatch =>{
        const result = await reqAddRole(roleName)
        if (result.status === 0) {
            dispatch(addRoleSuc(result.data))
            return Promise.resolve({ status:0,content:`添加角色成功` })
        }else {
            return Promise.reject({ status:1,content:result.msg })
        }
        
    }
}
 
export const updateRole = (role) => {
    return async dispatch => {
        const result = await reqUpdateRole(role)
        if (result.status === 0) {
            dispatch(updateRoleSuc(result.data))
            return Promise.resolve({ status:0,content:`更新角色权限成功` })
        }else {
            return Promise.resolve({ status:1,content:result.msg })
        }
    }
}