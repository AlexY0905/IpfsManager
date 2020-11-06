//富文本编辑器
import React, { Component } from "react"
import Simditor from "simditor"
// import $ from "jquery"


// import { UPLOAD_PRODUCT_DETAIL_IMAGES } from "api/mallConfig"
import "simditor/styles/simditor.css"
import "./index.css"

class RichEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toolbar: [
                'title',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'fontScale',
                'color',
                'ol',
                'ul',
                'blockquote',
                'code',
                'table',
                'link',
                'image',
                'hr',
                'indent',
                'outdent',
                'alignment'
            ],
            isLoad: false
        }
        // 利用jquery, 携带cookie信息
        /*
        $.ajaxSetup({
            url: UPLOADDETAILPATH,
            xhrFields: {
                withCredentials: true // 这里设置了允许携带cookie信息
            }
        })
         */
    }

    componentDidMount() {
        this.editor = new Simditor({
            textarea: this.textarea, // 副文本编辑器需要挂载的DOM节点
            toolbar: this.state.toolbar, // 菜单栏功能
            upload: { // 允许上传图片
                url: '', // UPLOAD_PRODUCT_DETAIL_IMAGES
                fileKey: "upload" // 图片存储到的字段
            }
        })
        const { getValues } = this.props;
        this.editor.on("valuechanged", () => {
            // 因为只要输入文字时, 就会触发更新函数, 所以会不停的更新输入框中的内容, 会造成输入文字时和光标不一致
            // 为了防止, 文字输入时和光标一致, 将isLoad改为true, 这样就阻止了, 内容的更新
            this.setState({ isLoad: true }, () => {
                getValues(this.editor.getValue());
            })
        })
    }
    // 组件更新阶段, 进行数据的回填 回填到编辑的富文本中
    componentDidUpdate() {
        if (this.props.values && !this.state.isLoad) {
            this.editor.setValue(this.props.values)
            this.setState({
                isLoad: true
            })
        }
    }

    render() {
        return (
            <textarea
                ref={textarea => this.textarea = textarea}
                id="editor"
            ></textarea>
        )
    }
}


export default RichEditor