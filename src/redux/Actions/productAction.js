import {
    RECEIVE_GET_PRODUCT_LIST_SUC,
    RECEIVE_GET_PRODUCT_LIST_FAIL,
    LOADING,
    RECEIVE_PRODUCT_SEARCH_SUC,
    RECEIVE_PRODUCT_SEARCH_FAIL,
    RECEIVE_ONE_PRODUCT_SUC,
    RECEIVE_ONE_PRODUCT_FAIL,
    RECEIVE_UPDATE_PRODUCT_STATUS_SUC,
    RECEIVE_UPDATE_PRODUCT_STATUS_FAIL,
    RECEIVE_CASCADER_NAME_SUC,
    RECEIVE_CASCADER_NAME_FAIL,

    RECEIVE_UPLOAD_PICTURE_SUC,
    RECEIVE_UPLOAD_PICTURE_FAIL,
    RECEIVE_PREVIEW_IMAGE,
    RECEIVE_DELETE_IMAGE_SUC,
    RECEIVE_DELETE_IMAGE_FAIL,

    RECEIVE_ADD_PRODUCT_SUC,
    RECEIVE_ADD_PRODUCT_FAIL,
    RECEIVE_UPDATE_PRODUCT_SUC,
    RECEIVE_UPDATE_PRODUCT_FAIL
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
const getProductListFail = (msg) => ({ type:RECEIVE_GET_PRODUCT_LIST_FAIL, msg:msg })
export const loading = (selectedOptions) => ({ type:LOADING,data:selectedOptions })
const searchSuc = (data) => ({ type:RECEIVE_PRODUCT_SEARCH_SUC,data:data })
const searchFail = (msg) => ({ type:RECEIVE_PRODUCT_SEARCH_FAIL,msg:msg })

export const oneProduct = (product) => ({ type:RECEIVE_ONE_PRODUCT_SUC, data:product })
const oneProductFail = (msg) => ({ type:RECEIVE_ONE_PRODUCT_FAIL, msg:msg })
const updateStatusSuc = (product) => ({ type:RECEIVE_UPDATE_PRODUCT_STATUS_SUC, data:product })
const updateStatusFail = (msg) => ({ type:RECEIVE_UPDATE_PRODUCT_STATUS_FAIL, msg:msg })
const getCascaderSuc = (cascaderObj) => ({ type:RECEIVE_CASCADER_NAME_SUC, data:cascaderObj })
const getCascaderFail = (msg) => ({ type:RECEIVE_CASCADER_NAME_FAIL, msg:msg })
const uploadSuc = (data) => ({ type:RECEIVE_UPLOAD_PICTURE_SUC, data })
export const previewImage = (type,imgFile) => ({ type:RECEIVE_PREVIEW_IMAGE,data:{ imgFile, type } })
const deleteSuc = (file) => ({ type:RECEIVE_DELETE_IMAGE_SUC,data:file })

const addSuc = (product) => ({ type:RECEIVE_ADD_PRODUCT_SUC, data:product })
const addFail = (msg) => ({ type:RECEIVE_ADD_PRODUCT_SUC, msg:msg })
export const initPictureWall = (imgs) => ({ type:'initPictureWall',data:imgs })

export const getProductList = ( pageNum ) => {
    return async dispatch => {
        dispatch(loading())
        const result = await reqProductList( pageNum,PAGE_SIZE )
        if (result.status === 0) {
            dispatch(getProductListSuc(result.data))
        } else {
            dispatch(getProductListFail(result.msg))
        }
    }
}

export const search = ( pageNum, searchName, searchType ) => {
    // console.log(pageNum, searchName, searchType)
    return async dispatch => {
        dispatch(loading())
        const result = await reqProductSearch( { pageNum, pageSize:PAGE_SIZE, searchName, searchType } )
        if (result.status === 0) {
            dispatch(searchSuc(result.data))
        }else {
            dispatch(searchFail(result.msg))
        }
    }
}

export const getCategoryName = ({ categoryId, pCategoryId, ...props }) => {
    return async dispatch => {
        const result = await reqGetCategoryName( categoryId,pCategoryId )
        if (result.status === 0) {
            dispatch(oneProduct({ ...result.data, categoryId, pCategoryId, ...props }))
        }else {
            dispatch(oneProductFail(result.msg))
        }
    }
}

export const updateState = ( status, productId ) => {
    return async dispatch => {
        const result = await reqUpdateStatus( status, productId )
        if (result.status === 0) {
            dispatch(updateStatusSuc(result.data))
        } else {
            dispatch(updateStatusFail(result.msg))
        }
    }
}

export const getCascaderName = (parentId,selectedOptions) => {
    return async dispatch => {
        const result = await reqGetCategoryList(parentId)
        if (result.status === 0) {
            dispatch(getCascaderSuc({ cascaderArr:result.data,selected:selectedOptions }))
        }else {
            dispatch(getCascaderFail(result.msg))
        }
        return false
    }
}

export const uploadPicture = (pictureFile,config,{ uid }) => {
    return async dispatch => {
        const result = await reqUploadPicture(pictureFile,config)
        if (result.status === 0) {
            dispatch(uploadSuc({ pictureObj:result. data,uid }))
        }
    }
}

export const deletePicture = (file) => {
    return async dispatch => {
        const result = await reqDeletePicture(file.name)
        if (result.status === 0) {
            dispatch(deleteSuc(file))
        }
    }
}

export const addOrUpdate = (product) => {
    return async dispatch => {
        const result = await reqaddOrUpdate(product)
        console.log(result)
        if (result.status === 0) {
            dispatch(addSuc(result.data))
            return Promise.resolve({ status:result.status, msg:product._id?'更新商品成功':'添加商品成功'})
        } else {
            dispatch(addFail(result.msg))
        }
    }
}