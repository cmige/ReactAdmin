import axios from 'axios'

export default function ajax(url, data={}, type='GET',config={}) {

    return new Promise((resolve,reject) => {
        let promise
        if(type === 'GET'){
            promise = axios.get(url,{params:data})
        }else {
            promise = axios.post(url,data,config)
        }

         promise.then(
response =>{
                resolve(response.data)
            }).catch( error => {
             reject(error.messages)
        })
    })
}