
import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import PropTypes from 'prop-types'

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'



export default class RichTextEditor extends Component {

    static propTypes =  {
        detail:PropTypes.string     // 修改产品信息时默认显示的详情信息
    }
    constructor(props) {
        super(props)
        const html = this.props.detail

        if (html) {
            const contentBlock = htmlToDraft(html)
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            this.state = {
                editorState
            }
        }else {
            this.state = {
                editorState: EditorState.createEmpty()
            }
        }
    }
    state = {
        editorState: EditorState.createEmpty()
    }
    uploadImageCallBack = (file) =>{
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.open('POST', '/api/manage/img/upload')
                xhr.setRequestHeader('Authorization', 'Client-ID XXXXX')
                const data = new FormData()
                data.append('image', file)
                xhr.send(data)
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText)
                    const url = response.data.url
                    resolve({data:{link:url}})
                })
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText)
                    reject(error)
                })
            }
        )
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        })
    }
    getDetail = () =>{
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    render() {
        const { editorState } = this.state
        return (
            <div>
                <Editor
                    editorState={editorState}
                    editorStyle={{border:"1px solid black",minHeight:200,padding:"0 15px"}}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                    }}
                />

            </div>
        )
    }
}
