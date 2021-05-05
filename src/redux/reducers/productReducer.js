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




const initProduct = {
    total:'',
    list:[],
    loading:false,
    msg:'',
    child:{},
    cascaderOptions:[],
    addSuc:false,
    pageNum:1
}

function product(state=initProduct,action) {
    switch (action.type) {
        case RECEIVE_GET_PRODUCT_LIST_SUC:
            const { total, list, pageNum } = action.data
            return {
                total,
                list,
                loading:false,
                pageNum
            }
        case RECEIVE_GET_PRODUCT_LIST_FAIL:
            return {
                msg: action.msg
            }
        case LOADING:
            let selectedOptions = action.data,
                loadingArr = []
            if (selectedOptions) {
                loadingArr = [...state.cascaderOptions]
                loadingArr.forEach(item => {
                    if (item.value === selectedOptions.value) {
                        item.loading = !item.loading
                    }
                })
            }
            return {
                ...state,
                loading:true,
                cascaderOptions: loadingArr
            }
        case RECEIVE_PRODUCT_SEARCH_SUC:
            return {
                ...state,
                ...action.data,
                loading:false,
            }
        case RECEIVE_PRODUCT_SEARCH_FAIL:
            return {
                msg: action.msg
            }
        case RECEIVE_ONE_PRODUCT_SUC:
            return {
                ...state,
                child:action.data
            }
        case RECEIVE_ONE_PRODUCT_FAIL:
            return {
                msg: action.msg
            }
        case RECEIVE_UPDATE_PRODUCT_STATUS_SUC:
            let arr = [...state.list]
            let { _id, status } = action.data
            arr.forEach(product => {
                if (_id === product._id) {
                    product.status = status
                }
            })
            return {
                ...state,
                list: arr
            }
        case RECEIVE_UPDATE_PRODUCT_STATUS_FAIL:
            return {
                msg: action.msg
            }
        case RECEIVE_CASCADER_NAME_SUC:
            let { cascaderArr, selected } = action.data

            let cascaderOptions = []
            if (cascaderArr.length === 0){
                cascaderOptions = [...state.cascaderOptions]
                cascaderOptions.forEach(item=>{
                    if (item.value === selected.value) {
                        item.isLeaf = true
                        item.loading = false
                    }
                })
            }
            cascaderArr.forEach(item => {
                if (item.parentId === '0') {
                    cascaderOptions.push({
                        label:item.name,
                        value: item._id,
                        isLeaf:false,
                    })
                }else {
                    cascaderOptions = [...state.cascaderOptions]
                    cascaderOptions.forEach(cItem => {
                        if (selected && selected.value === cItem.value) {
                            cItem.loading = false
                        }
                        if (cItem.value === item.parentId){
                            cItem.children = cItem.children || []
                            cItem.children.push({
                                label:item.name,
                                value: item._id,
                            })
                        }
                    })
                }
            })
            return {
                ...state,
                cascaderOptions
            }
        case RECEIVE_CASCADER_NAME_FAIL:
            return {
                msg: action.msg
            }

        case RECEIVE_ADD_PRODUCT_SUC:
            return {
                ...state,
                addSuc:true
            }
        case RECEIVE_ADD_PRODUCT_FAIL:
            return
        case RECEIVE_UPDATE_PRODUCT_SUC:
            return {
                ...state,
                child:action.data
            }
        case RECEIVE_UPDATE_PRODUCT_FAIL:
            return {
                msg:action.msg
            }
        default:
            return state
    }
}

const initPictureWall = {
    visibility:false,
    fileList:[],
    previewImage:'',
    previewTitle:''

}
export function pictureWall(state=initPictureWall,action) {
    switch (action.type) {
        case RECEIVE_UPLOAD_PICTURE_SUC:
            let { pictureObj, uid, statusType } = action.data
            let fileList = []
            if (state.fileList.length) {
                fileList = [...state.fileList]

            }
            fileList.push({
                uid,
                name:pictureObj.name,
                status:'done',
                url:pictureObj.url
            })
            return {
                ...state,
                fileList
            }
        case RECEIVE_UPLOAD_PICTURE_FAIL:
            return state
        case RECEIVE_PREVIEW_IMAGE:
            const { imgFile, type } = action.data
            if (type === 'cancel')
                return {
                    ...state,
                    visibility:false,
                    previewImage:'',
                    previewTitle:''
                }
            return {
                ...state,
                visibility:true,
                previewImage:imgFile.url,
                previewTitle:imgFile.name
            }
        case RECEIVE_DELETE_IMAGE_SUC:
            const deleteObj = action.data
            return {
                ...state,
                fileList:state.fileList.filter(item => item.uid !== deleteObj.uid)
            }
        case 'initPictureWall' :
            const imgsArr = action.data
            const BASE_URL = 'http://localhost:4000/upload/'
            let initFileList = []
            imgsArr.forEach((item,index)=>{
                initFileList.push({
                    uid:-index,
                    name:item,
                    status:'done',
                    url:BASE_URL+ item
                })
            })
            return {
                ...state,
                fileList:initFileList
            }
        default:
            return state
    }
}

export default product