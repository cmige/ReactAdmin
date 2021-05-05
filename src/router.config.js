import { lazy } from 'react'

// import Home from './pages/home/home'
// import Category from "./pages/category/category"
// import Product from "./pages/product/product"
// import ProductHome from "./pages/product/product-home.jsx"
// import ProductAddUpdate from "./pages/product/child/add-update"
// import ProductDetail from "./pages/product/child/product-detail"
// import User from "./pages/user/user"
// import Role from "./pages/role/role"
// import Charts from './pages/charts/charts'
// import Bar from "./pages/charts/children/bar"
// import Pie from "./pages/charts/children/pie"
// import Line from "./pages/charts/children/line"

const Admin = lazy(()=>import('./pages/admin/admin'))
const Login = lazy(()=>import('./pages/login/login'))
const Home = lazy(()=>import('./pages/home/home'))
const Category = lazy(()=>import('./pages/category/category'))
const Product = lazy(()=>import('./pages/product/product'))
const ProductHome = lazy(()=>import('./pages/product/product-home.jsx'))
const ProductAddUpdate = lazy(()=>import('./pages/product/child/add-update'))
const ProductDetail = lazy(()=>import('./pages/product/child/product-detail'))
const User = lazy(()=>import('./pages/user/user'))
const Role = lazy(()=>import('./pages/role/role'))
const Charts = lazy(()=>import('./pages/charts/charts'))
const Bar = lazy(()=>import('./pages/charts/children/bar'))
const Pie = lazy(()=>import('./pages/charts/children/pie'))
const Line = lazy(()=>import('./pages/charts/children/line'))

const Routers = [
    { path:'/login', name:'login', component: Login },
    { path:'', name:'admin', component: Admin,
        routes:[
            { path:'/home', name:'home', component: Home },
            { path:'/category', name:'category', component: Category },
            { path:'/product', name:'product', component: Product,
                routes:[
                    { path:'/product/addupdate', name:'addupdate', component:ProductAddUpdate },
                    { path:'/product/detail', name:"detail", component:ProductDetail },
                    { path:'', name:"/product/home", component:ProductHome},
                ]
            },
            { path:'/user', name:'user', component: User },
            { path:'/role', name:'role', component: Role },
            { path:'/charts', name:'charts', component: Charts,
                routes:[
                    { path:'/charts/bar', name:'bar', component: Bar },
                    { path:'/charts/pie', name:'pie', component: Pie },
                    { path:'/charts/line', name:'line', component: Line }
                ]
            },

        ]
    },
    { path:'', name:'login', component: Login },
]

export default Routers