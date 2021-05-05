import { combineReducers } from 'redux'
import user from './userReducer'
import category from './categoryReducer'
import product, { pictureWall }from './productReducer'
import role from './roleReducer'

export default combineReducers({
    user,
    category,
    product,
    pictureWall,
    role
})