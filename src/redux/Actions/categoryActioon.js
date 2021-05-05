import {
    RECEIVE_GET_CATEGORY_LIST_SUC,
    RECEIVE_GET_CATEGORY_LIST_FAIL,
    RECEIVE_SHOW_FORM,
    RECEIVE_CONFIRM_LOADING,
    RECEIVE_CATEGORY_ADD_SUC,
    RECEIVE_CATEGORY_ADD_FAIL,
    RECEIVE_CATEGORY_UPDATE_SUC,
    RECEIVE_CATEGORY_UPDATE_FAIL
} from '../actions_type'
import {
    reqGetCategoryList,
    reqCategoryUpdate,
    reqCategoryAdd,

} from '../../api'
import {message} from "antd";
// 获取分类列表
const categoryListSuc = (category) => ({ type:RECEIVE_GET_CATEGORY_LIST_SUC, data:category })
const categoryListFail = (msg) => ({ type:RECEIVE_GET_CATEGORY_LIST_FAIL, msg: msg })

//显示Form和异步发送请求的状态
export const showForm = (visible) => ({ type:RECEIVE_SHOW_FORM,data:{visible} })
export const confirmLoading = (confirmLoading) => ({ type:RECEIVE_CONFIRM_LOADING, data:{confirmLoading}})

// 更新分类名称
const updateSuc = (categoryId,name) => ({ type:RECEIVE_CATEGORY_UPDATE_SUC, data:{categoryId,name} })
const updateFail = (msg) => ({ type:RECEIVE_CATEGORY_UPDATE_FAIL, msg:msg })

// 添加分类
export const addSuc = (category) => ({ type:RECEIVE_CATEGORY_ADD_SUC, data:category })
export const addFail = (msg) => ({ type:RECEIVE_CATEGORY_ADD_FAIL, msg:msg })


export const getCategoryList = (parentId,parentName) => {
    return async dispatch =>{
        const result = await reqGetCategoryList(parentId)
        if (result.status === 0){
            dispatch(categoryListSuc({categoryList:result.data,parentId,parentName}))
        }else {
            dispatch(categoryListFail(result.msg ))
        }
    }
}

export const update = (categoryId,name) => {
    return async dispatch =>{
        const result = await reqCategoryUpdate(categoryId,name)
        if (result.status === 0){
            console.log(result)
            dispatch(updateSuc(categoryId,name))
            message.success("更新分类名称成功",1)
        }else {
            dispatch(updateFail({ msg:result.msg }))
            message.success("更新分类名称失败",1)
        }
    }
}

export const add = ({ parentId,name }) => {
    return async dispatch => {
        const result = await reqCategoryAdd(parentId,name)
        if (result.status === 0){
            dispatch(addSuc( result.data ))
            message.success("添加分类成功",1)
        } else {
            dispatch(addFail(result.msg ))
            message.success("添加分类失败",1)
        }
    }
}