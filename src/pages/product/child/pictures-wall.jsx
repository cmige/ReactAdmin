import React, { Component } from 'react'

import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { uploadPicture, previewImage, deletePicture, initPictureWall } from '../../../redux/Actions/productAction'
import PropType from 'prop-types'
const BASE_URL = '/api'

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//     });
// }

class PictureWall extends Component {

    static propType = {
        getRef:PropType.func,
        imgs:PropType.array,
        productId:PropType.string
    }
    deleteArr = []
    uploadArr = []
    handleCancel = () => this.props.previewImage('cancel')
    handlePreview =  file => this.props.previewImage('preview',file)

    Delete = (type,file) => {
        if (type === 'fake'){
            this.props.deletePicture(file,type)
        } else {
            this.props.deletePicture(file,type)
        }

    }
    upload = ({ fmData, config, file, productId, type }) => {
        this.props.uploadPicture( fmData, config, file, productId || '',type)
    }
    handleChange = ({ file,fileList }) => {
        if (file.status === 'removed'){
            this.deleteArr.push(file)
            this.Delete('fake',file)
        } 

    }
    
    onCustomRequest = async (option) => {
        const { onSuccess, onError, file, onProgress, action } = option;

        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
            // //上传图片上时的进度条显示
            // onUploadProgress: event => {
            //     const percent = Math.floor((event.loaded / event.total) * 100);
            //     this.setState({percent});
            //     if (percent === 100) {
            //         setTimeout(() =>  this.setState({percent}), 1000);
            //     }
            //     onProgress({ percent: (event.loaded / event.total) * 100 });
            // }
        };
        fmData.append("image", file);
        try {
            // this.uploadArr.push({ fmData:fmData, file:file, productId: this.props.productId || '', config:config })
            this.upload({ fmData, config, file, productId:this.props.productId || ''})

            // this.props.productId 如果有 证明是修改/详情页面，没有则是添加产品
            // message(await this.props.uploadPicture( fmData, config, file, this.props.productId || ''))
            // onSuccess('ok')
            // const res = await axios.post(
            //     "https://jsonplaceholder.typicode.com/posts",
            //     fmData,
            //     config
            // );
            onSuccess('ok')
        } catch (err) {
            console.log("Eroor: ", err);
            // const error = new Error("Some error");
            onError({ err });
        }

    }

    getImgs = () => {
        const { pictureWall } = this.props
        return pictureWall.fileList.map(item => item.name)
    }
    componentDidMount() {
        this.props.getRef(this)
        this.props.initPictureWall(this.props.imgs, this.props.productId)
    }

    render() {
        console.log('render pictureWall')
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        const { pictureWall } = this.props
        return (
            <>

                <Upload
                   action={BASE_URL+'/manage/img/upload'} //上传的后台地址
                    accept='image/*'
                    name='image ' //发到后台的文件参数名
                    listType="picture-card"
                    fileList={ pictureWall.fileList } //已经上传的文件列表
                    onPreview={ this.handlePreview } //点击文件链接或预览图标时的回调
                    onChange={ this.handleChange } //上传文件改变时的状态
                    customRequest={
                        this.onCustomRequest
                    }
                >

                    { pictureWall.fileList.length >= 8 ? null : uploadButton}
                </Upload>

                <Modal
                    visible={ pictureWall.visibility }
                    title={ pictureWall.previewTitle }
                    footer={null}
                    onCancel={ this.handleCancel }
                >
                    <img alt="example" style={{ width: '100%' }} src={ pictureWall.previewImage } />
                </Modal>
            </>
        );
    }
}


export default connect(
    state=>({ pictureWall:state.pictureWall }),
    { uploadPicture, previewImage, deletePicture, initPictureWall }
)(PictureWall)