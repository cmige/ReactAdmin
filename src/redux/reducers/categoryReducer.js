import {
    RECEIVE_GET_CATEGORY_LIST_SUC,
    RECEIVE_SHOW_FORM,
    RECEIVE_CONFIRM_LOADING,
    RECEIVE_CATEGORY_ADD_SUC,
    RECEIVE_CATEGORY_UPDATE_SUC,
} from '../actions_type'

const initCategory = {
    categoryList:[],
    msg:' ',
    loading:true,
    parentId:'0',
    parentName:'',
    visible:0,
    confirmLoading:false,
}

function category(state=initCategory,action) {
    switch (action.type) {
        case RECEIVE_GET_CATEGORY_LIST_SUC:             // receive_get_category_list_suc
            const { categoryList,parentId,parentName} = action.data
            return {
                categoryList,
                loading:false,
                parentId,
                parentName,
                visible: state.visible,
                confirmLoading:false,
                oldList:state.categoryList
            }

        case RECEIVE_SHOW_FORM:                         // receive_show_form
            const { visible } = action.data
            return {
                ...state,
                visible,
                confirmLoading:false
            }

        case RECEIVE_CATEGORY_UPDATE_SUC:               // receive_category_update_suc
            const { categoryId, name } = action.data
            const nweCategoryList = [...state.categoryList]
            nweCategoryList.forEach(item=> {
                if (categoryId === item._id) {
                    item.name = name
                }
            } )
            return {
                ...state,
                categoryList:nweCategoryList,
                confirmLoading:false,
                visible:0
            }

        case RECEIVE_CONFIRM_LOADING:                   // receive_confirm_loading
            const { confirmLoading } = action.data
            return {
                ...state,
                confirmLoading:confirmLoading

            }
        case RECEIVE_CATEGORY_ADD_SUC:                  // receive_category_add_suc
            const addCategoryList = [...state.categoryList]
            addCategoryList.push(action.data)
            return {
                ...state,
                confirmLoading:false,
                visible:0,
                categoryList: addCategoryList
            }
        default:
            return state
    }
}

export default category