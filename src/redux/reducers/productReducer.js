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
    RECEIVE_UPDATE_PRODUCT_SUC,
} from '../actions_type'




const initProduct = {
    total:'',
    list:[],
    loading:false,
    child:{},
    cascaderOptions:[],
    addSuc:false,
    pageNum:1,
    search:{
        isSearch:false,
        searchName:'',
        searchType:''
    }
}

function product(state=initProduct,action) {
    switch (action.type) {
        case RECEIVE_GET_PRODUCT_LIST_SUC:                  // receive_get_product_list_suc
            const { total, list, pageNum } = action.data
            return {
                total,
                list,
                loading:false,
                pageNum
            }
        case LOADING:                                       // loading
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
        case RECEIVE_PRODUCT_SEARCH_SUC:                    // receive_product_search_suc
            console.log(action.data)
            const { isSearch, searchName, searchType } = action.data

            return {
                ...state,
                ...action.data.search,
                search:{ isSearch, searchName, searchType },
                loading:false,
            }

        case RECEIVE_ONE_PRODUCT_SUC:                       // receive_one_product_suc
            return {
                ...state,
                child:action.data
            }

        case RECEIVE_UPDATE_PRODUCT_STATUS_SUC:             // receive_update_product_status_suc
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

        case RECEIVE_CASCADER_NAME_SUC:                     // receive_cascader_name_suc
            // selected 为了标记 cascader 异步加载的数据 以及 异步加载的对象
            let { cascaderArr, selected } = action.data

            let cascaderOptions = []
            // cascaderArr.length = 0 没有子分类，isLeaf 要改为 true
            if (cascaderArr.length === 0){
                cascaderOptions = [...state.cascaderOptions]
                cascaderOptions.forEach(item=>{
                    if (item.value === selected.value) {
                        item.isLeaf = true
                        item.loading = false
                    }
                })
            }
            // cascaderArr.length ！= 0 有子分类，cascaderArr 可能是一级，也可能是二级
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

        case RECEIVE_ADD_PRODUCT_SUC:                       // receive_add_product_suc
            return {
                ...state,
                addSuc:true
            }

        case RECEIVE_UPDATE_PRODUCT_SUC:                    // receive_update_product_suc
            return {
                ...state,
                child:action.data
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
        case RECEIVE_UPLOAD_PICTURE_SUC:            // receive_upload_picture_suc
            let { pictureObj, uid, productId } = action.data
            console.log(action.data)
            let fileList = []
            if (state.fileList.length) {
                fileList = [...state.fileList]

            }
            fileList.push({
                productId: productId || '',
                uid,
                name:pictureObj.name,
                status:'done',
                url:pictureObj.url
            })
            return {
                ...state,
                fileList
            }

        case RECEIVE_PREVIEW_IMAGE:                 // receive_preview_image
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
        case RECEIVE_DELETE_IMAGE_SUC:              // receive_delete_image_suc
            const deleteObj = action.data
            return {
                ...state,
                fileList:state.fileList.filter(item => item.uid !== deleteObj.uid)
            }
        case 'initPictureWall' :                    // init_picture_wall
            let { productId:pId , imgs:imgsArr } = action.data

            const BASE_URL = 'http://localhost:4000/upload/'
            let initFileList = []
            imgsArr.forEach((item,index)=>{
                initFileList.push({
                    productId:pId,
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