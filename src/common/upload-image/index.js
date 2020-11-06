//上传图片组件
import React, { Component } from 'react'
import { Upload, Icon, Modal, message } from 'antd'
// import api from 'api/mallIndex.js'

class UploadImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            isImageBackFill: true//删除回填图片
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.handlePreview = this.handlePreview.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        if (props.fileList.length > 0 && state.fileList.length == 0 && state.isImageBackFill) {
            console.log('props.fileList==========', props.fileList);
            state.isImageBackFill = false//删除回填图片
            return {
                fileList: props.fileList
            }
        }
        return null
    }
    handleCancel() {
        this.setState({ previewVisible: false })
    }

    handlePreview(file) {
        this.setState({
            previewImage: file.url || file.preview,
            // previewVisible: true,
            previewVisible: false,
        })
    }

    handleChange({ file, fileList }) {
        if (file.status === 'removed') {//此判断可以监听到某张被删除的图片(然后发请求,删除图片)
            console.log('被删除的图片-----', file);
            let { url } = file
            console.log('url-------', url);
            api.delImage({ url })
                .then((result) => {
                    console.log("删除成功", result);
                    message.success('删除成功')
                })
                .catch((err) => {
                    message.error('删除失败,请稍后再试')
                })
        }

        this.setState({ fileList }, () => {
            // this.props.getFileList(fileList.map(file => {
            //     console.log('=======220', file.thumbUrl);
            //     return file.thumbUrl
            // }))

            this.props.getFileList(fileList.map(file => {
                if (file.response) {
                    return file.response.url
                }
            }).join(','))
        })
    }


    render() {
        const { previewVisible, previewImage, fileList } = this.state
        const { max, action } = this.props
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return (
            <div className="clearfix">
                <Upload
                    action={action}
                    // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    // action='http://localhost:3001/admin/image'
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    withCredentials={true}
                    showUploadList={{ showPreviewIcon: false }}
                >
                    {/* {fileList.length >= max ? null : uploadButton} */}
                    {fileList.length >= 10 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}

export default UploadImage
