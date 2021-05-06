import {
    RECEIVE_GET_CATEGORY_LIST_SUC,
    RECEIVE_SHOW_FORM,
    RECEIVE_CONFIRM_LOADING,
    RECEIVE_CATEGORY_ADD_SUC,
    RECEIVE_CATEGORY_UPDATE_SUC,
} from '../actions_type'
import {
    reqGetCategoryList,
    reqCategoryUpdate,
    reqCategoryAdd,

} from '../../api'

// 获取分类列表
const categoryListSuc = (category) => ({ type:RECEIVE_GET_CATEGORY_LIST_SUC, data:category })

//显示Form和异步发送请求的状态
export const showForm = (visible) => ({ type:RECEIVE_SHOW_FORM,data:{visible} })
export const confirmLoading = (confirmLoading) => ({ type:RECEIVE_CONFIRM_LOADING, data:{confirmLoading}})

// 更新分类名称
const updateSuc = (categoryId,name) => ({ type:RECEIVE_CATEGORY_UPDATE_SUC, data:{categoryId,name} })

// 添加分类
export const addSuc = (category) => ({ type:RECEIVE_CATEGORY_ADD_SUC, data:category })


export const getCategoryList = (parentId,parentName) => {
    return async dispatch =>{
        const result = await reqGetCategoryList(parentId)
        if (result.status === 0){
            dispatch(categoryListSuc({categoryList:result.data,parentId,parentName}))
            return Promise.resolve({ status:0,content:`${parentName?'获取子分类列表成功':'获取分类列表成功'}` })
        }else {
            return Promise.resolve({ status:1,content:result.msg })
        }
    }
}

export const update = (categoryId,name) => {
    return async dispatch =>{
        const result = await reqCategoryUpdate(categoryId,name)
        if (result.status === 0){
            dispatch(updateSuc(categoryId,name))
            return Promise.resolve({ status:0,content:`更新分类列表成功` })
        }else {
            return Promise.resolve({ status:1,content:result.msg })
        }
    }
}

export const add = ({ parentId,name }) => {
    return async dispatch => {
        const result = await reqCategoryAdd(parentId,name)
        if (result.status === 0){
            dispatch(addSuc( result.data ))
            return Promise.resolve({ status:0,content:`添加分类成功` })
        } else {
            return Promise.resolve({ status:1,content:result.msg })
        }
    }
}