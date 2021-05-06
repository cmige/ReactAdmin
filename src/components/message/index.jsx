import { message } from 'antd'

export default function Message({status,content}) {
    if (status === 0) {
        return message.success(content,1)
    }else {
        return message.error(content,1)
    }

}