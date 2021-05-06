import {
    RECEIVE_GET_PRODUCT_LIST_SUC,
    LOADING,
    RECEIVE_PRODUCT_SEARCH_SUC,
    RECEIVE_ONE_PRODUCT_SUC,
    RECEIVE_UPDATE_PRODUCT_STATUS_SUC,
    RECEIVE_CASCADER_NAME_SUC,
    RECEIVE_UPLOAD_PICTURE_SUC,
    RECEIVE_PREVIEW_IMAGE,
    RECEIVE_DELETE_IMAGE_SUC,
    RECEIVE_ADD_PRODUCT_SUC,

} from '../actions_type'

import {
    reqProductList,
    reqProductSearch,
    reqGetCategoryName,
    reqUpdateStatus,
    reqGetCategoryList,
    reqUploadPicture,
    reqDeletePicture,
    reqaddOrUpdate
} from '../../api'
import { PAGE_SIZE } from '../../utils/contants'
import axios from "axios";

const getProductListSuc = (products) => ({ type:RECEIVE_GET_PRODUCT_LIST_SUC, data:products })
export const loading = (selectedOptions) => ({ type:LOADING,data:selectedOptions })
const searchSuc = (data) => ({ type:RECEIVE_PRODUCT_SEARCH_SUC,data:data })

export const oneProduct = (product) => ({ type:RECEIVE_ONE_PRODUCT_SUC, data:product })
const updateStatusSuc = (product) => ({ type:RECEIVE_UPDATE_PRODUCT_STATUS_SUC, data:product })
const getCascaderSuc = (cascaderObj) => ({ type:RECEIVE_CASCADER_NAME_SUC, data:cascaderObj })
const uploadSuc = (data) => ({ type:RECEIVE_UPLOAD_PICTURE_SUC, data })
export const previewImage = (type,imgFile) => ({ type:RECEIVE_PREVIEW_IMAGE,data:{ imgFile, type } })
const deleteSuc = (file) => ({ type:RECEIVE_DELETE_IMAGE_SUC,data:file })

const addOrUpdateSuc = (product) => ({ type:RECEIVE_ADD_PRODUCT_SUC, data:product })
export const initPictureWall = (imgs) => ({ type:'initPictureWall',data:imgs })

export const getProductList = ( pageNum ) => {
    return async dispatch => {
        dispatch(loading())
        const result = await reqProductList( pageNum,PAGE_SIZE )
        if (result.status === 0) {
            dispatch(getProductListSuc(result.data))
            return Promise.resolve({ status:0,content:`获取产品分页列表成功，当前页码${pageNum}` })
        } else {
            return Promise.resolve({ status:1,content:result.msg })
        }
    }
}

export const search = ( pageNum, searchName, searchType ) => {
    return async dispatch => {
        dispatch(loading())
        const result = await reqProductSearch( { pageNum, pageSize:PAGE_SIZE, searchName, searchType } )
        if (result.status === 0) {
            dispatch(searchSuc(result.data))
            return Promise.resolve({ status:0,content:`搜索产品成功` })
        }else {
            return Promise.resolve({ status:1,content:result.msg })
        }
    }
}

export const getCategoryName = ({ categoryId, pCategoryId, ...props }) => {
    return async dispatch => {
        const result = await reqGetCategoryName( categoryId,pCategoryId )
        if (result.status === 0) {
            dispatch(oneProduct({ ...result.data, categoryId, pCategoryId, ...props }))
        }else {
            return Promise.resolve({ status:1,content:result.msg })
        }
    }
}

export const updateState = ( status, productId ) => {
    return async dispatch => {
        const result = await reqUpdateStatus( status, productId )
        if (result.status === 0) {
            dispatch(updateStatusSuc(result.data))
            return Promise.resolve({ status:0,content:`${result.data.status===1?'下架成功':'上架成功'}` })
        } else {
            return Promise.resolve({ status:1,content:result.msg })
        }
    }
}

export const getCascaderName = (parentId,selectedOptions) => {
    return async dispatch => {
        const result = await reqGetCategoryList(parentId)
        if (result.status === 0) {
            dispatch(getCascaderSuc({ cascaderArr:result.data,selected:selectedOptions }))
        }else {
            return Promise.resolve({ status:1,content:result.msg })
        }
    }
}

export const uploadPicture = (pictureFile,config,{ uid }) => {
    return async dispatch => {
        const result = await reqUploadPicture(pictureFile,config)
        if (result.status === 0) {
            dispatch(uploadSuc({ pictureObj:result. data,uid }))
            return Promise.resolve({ status:0,content:`上传图片成功` })
        }else {
            return Promise.resolve({ status:1,content:result.msg })
        }
    }
}

export const deletePicture = (file) => {
    return async dispatch => {
        const result = await reqDeletePicture(file.name)
        if (result.status === 0) {
            dispatch(deleteSuc(file))
            return Promise.resolve({ status:0,content:`删除图片成功` })
        }else {
            return Promise.resolve({ status:1,content:result.msg })
        }
    }
}

export const addOrUpdate = (product) => {
    return async dispatch => {
        const result = await reqaddOrUpdate(product)
        console.log(result)
        if (result.status === 0) {
            dispatch(addOrUpdateSuc(result.data))
            return Promise.resolve({ status:result.status, content:product._id?'更新商品成功':'添加商品成功'})
        } else {
            return Promise.resolve({ status:1,content:result.msg })
        }
    }
}