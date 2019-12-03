<template>
  <div ref="container">
    <el-button type="primary" v-if="enableUpload && !enableDrop">
      <span ref="pickfiles">{{options.browseButton}}</span>
    </el-button>
    <el-button type="primary" v-if="enableUpload && !enableDrop" @click="upload">{{options.uploadButton}}</el-button>
    <div v-if="enableDrop" ref="dragArea" class="drag-area">
      <p>
        <i class="el-icon-upload elicon"></i>
      </p>
      <p>
        <span class="shuoming">
          将文件拖到此处，或
          <i class="clickupload">点击上传</i>
        </span>
      </p>
    </div>
    <el-row v-for="file in files" :key="file.id">
      <el-col :span="12">
        <div v-if="file.percent === 100" style="cursor: pointer;color: #409EFF" @click="downloadFile(file)">{{file.name}} ({{formatSize(file)}})</div>
        <div v-else @click="downloadFile(file)">{{file.name}} ({{formatSize(file)}})</div>
        <div v-if="file.imgsrc" style="cursor: pointer" @click="openPreview(file.imgsrc)"><img :src="file.imgsrc" :key="file.id" style="width:40px;height:40px;"></div>
      </el-col>
      <el-col v-show="enableUpload" :span="11">
        <el-progress style="margin-top: 8px" :text-inside="true" :stroke-width="18" :percentage="file.percent"></el-progress>
      </el-col>
      <e-col :span="1">
        <el-button v-show="enableUpload" style="color: #f56c6c" type="text" @click="remove(file)">
          <i class="el-icon-circle-close"></i>
        </el-button>
      </e-col>
    </el-row>
    <el-dialog title="图片预览" :visble.sync="dialogVisible" @close="cancel" append-to-body>
      <div style="width:760px;height:100%;overflow:auto;">
        <img :src="selectImage" alt="">
      </div>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'loadsh'
import plupload from 'plupload'
import { getDownloadUrl, addFileInfo, getFileInfoByIds } from '@/api/oss'
// import { getToken } from '@/utils/auth'
import requestSync from '@/utils/requestSync'
// import request from '@/utils/request'
import fileDownload from 'js-file-download'
import axios from 'axios'
const uploaderDefaultOption = {
  runtimes: 'html5,flash,silverlight,html4',
  // browse_button: 'pickfiles', // you can pass an id...
  // container: document.getElementById('container'), // ...or DOM Element itself
  // url: 'upload.php',
  flash_swf_url: '../js/Moxie.swf',
  silverlight_xap_url: '../js/Moxie.xap',
  resize: {
    // quality: 压缩后的图片的质量，只对jpg格式的图片有效，默认为90.quality可以跟width和height一起使用，但也可以单独使用，单独使用时，压缩后图片的宽高不会变化，但由于质量降低了，所以体积也会变小
    quality: 50,
    // preserve_headers: 压缩后是否保留图片的元数据，true为保留，false为不保留，默认为true。删除图片的元数据能使图片的体积减小一点点
    preserve_headers: false
  },
  filters: {
    max_file_size: '102400kb', // 最大只能上传102400kb的文件
    prevent_duplicates: true // 不允许选取重复文件
  }
}
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    serviceName: {
      type: String,
      required: true,
      default: 'not-service'
    },
    moduleName: {
      type: String,
      required: true,
      default: 'not-module'
    },
    options: {
      type: Object,
      default() {
        return {
          browseButton: '选择文件',
          uploadButton: '上传'
        }
      }
    },
    mode: {
      type: String,
      default: 'default' // default,drop,picture,picture-card
    },
    autoUpload: {
      type: Boolean,
      default: false
    },
    enableDrop: {
      type: Boolean,
      default: false
    },
    enableUpload: {
      type: Boolean,
      default: true
    },
    imageOnly: {
      type: Boolean,
      default: false
    },
    singleSelect: {
      type: Boolean,
      default: false
    },
    entryHeader: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uploader: null,
      host: '',
      policyBase64: '',
      accessid: '',
      signature: '',
      expire: '',
      callbackbody: '',
      dirName: '',
      objectNameType: 'random_name',
      files: [],
      entryHeaders: undefined,
      selectImage: undefined,
      dialogVisible: false
    }
  },
  computed: {

  },
  // watch: {
  //   options: {
  //     handler(val, oldVal) {
  //       const self = this
  //       if (!self.uploader) {
  //         self.renderPlupload()
  //       } else {
  //         const opt = self.mergeOptions(val)
  //         self.uploader.setOption(opt)
  //       }
  //       console.log('options change!')
  //       console.log(val)
  //     },
  //     deep: true
  //   }
  // },
  watch: {
    // 处理查看表单详情时，附件有值，而页面无显示的问题
    value(newVal) {
      if (newVal !== '' && newVal !== null && newVal !== undefined) {
        this.loadData()
      }
    }
  },
  methods: {
    emptyFiles() {
      this.files = []
    },
    loadData() {
      if (this.files.length === 0 && this.value !== '' && this.value !== null) {
        getFileInfoByIds(this.value).then(response => {
          response.forEach(item => {
            const file = {}
            file.id = item.id
            file.name = item.fileOldName
            file.objectName = item.filePath
            file.size = item.fileSize
            // file.loaded = file.fileSize
            file.percent = 100
            file.show = true
            if (this.imageOnly) {
              getDownloadUrl(file.objectName).then(res => {
                this.$set(file, 'imgsrc', res)
              })
            }
            this.files.push(file)
          })
        })
      }
    },
    formatSize(file) {
      return plupload.formatSize(file.size)
    },
    mergeOptions(val) {
      const option = {
        browse_button: this.$refs.pickfiles,
        container: this.$refs.container
        // http_method: 'put'
      }
      if (this.enableDrop) {
        option.browse_button = this.$refs.dragArea
        option.drop_element = this.$refs.dragArea
      }
      return _.merge(uploaderDefaultOption, val, option)
    },
    randomString(len) {
      len = len || 32
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      const maxPos = chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random()*maxPos))
      }
      return pwd
    },
    getSuffix(filename) {
      const pos = filename.lastIndexOf('.')
      let suffix = ''
      if (pos !== -1) {
        suffix = filename.substring(pos)
      }
      return suffix
    },
    calculateObjectName(filename) {
      console.log(filename)
      let objectName = ''
      if (this.objectNameType === 'local_name') {
        objectName += '${filename}'
      } else if (this.objectNameType === 'random_name') {
        const suffix = this.getSuffix(filename)
        objectName = this.dirName + this.randomString(10) + suffix
      }
      console.log(objectName)
      return objectName
    },
    getSignature() {
      const obj = requestSync({
        url: '/api/file-server/oss/upload/token/' + this.serviceName + '/' + this.moduleName,
        method: 'GET',
        headers: this.entryHeaders
      })
      // const obj = requestSync({
      //   url: 'http://127.0.0.1:8095/oss/upload/token/' + this.serviceName + '/' + this.moduleName,
      //   method: 'GET'
      // })
      this.host = obj.host
      this.policyBase64 = obj.policy
      this.accessid = obj.accessid
      this.signature = obj.signature
      this.expire = parseInt(obj.expire)
      // this.callbackbody = obj.callback
      this.dirName = obj.dir
    },
    setUploadParam(up, file) {
      this.getSignature()
      if (file.name !== '') {
        file.objectName = this.calculateObjectName(file.name)
      }
      const new_multipart_params = {
        key: file.objectName,
        policy: this.policyBase64,
        OSSAccessKeyId: this.accessid,
        success_action_status: '200', // 让服务端返回200 ，不然默认会返回204
        signature: this.signature
      }
      this.uploader.setOption({
        url: this.host,
        multipart_params: new_multipart_params
      })
    },
    upload() {
      this.uploader.start()
    },
    remove(file) {
      const index = this.files.indexOf(file)
      this.files.splice(index, 1)
      this.updateModel()
    },
    updateModel() {
      const fileIds = this.files.map(item => item.id).join(',')
      this.$emit('input', fileIds)
    },
    openDownloadDialog(url, saveName) {
      const loading = this.$loading({
        lock: true,
        text: '加载中......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      axios({ url, responseType: 'arraybuffer' })
        .then(response => {
          fileDownload(response.data, saveName)
          loading.close()
        })
        .catch(error => {
          alert(error)
          loading.close()
        })
    },
    downloadFile(file) {
      if (file.status === 1) {
        alert('文件还没有上传，不能下载！')
      } else {
        getDownloadUrl(file.objectName).then(response => {
          this.openDownloadDialog(response, file.name)
        })
      }
    },
    refresh() {
      // 上传按钮位置有改变时需要刷新上传组件
      this.$nextTick(() => {
        this.uploader.refresh()
      })
    },
    renderPlupload() {
      const self = this
      self.$nextTick(() => {
        const opt = self.mergeOptions(self.options)
        self.uploader = new plupload.Uploader(opt)
        self.uploader.bind('PostInit', function(uploader) {
          this.files = []
          self.$emit('init', uploader)
        })

        self.uploader.bind('FilesAdded', (up, files) => {
          if (this.singleSelect && self.files.length > 0) {
            self.$message('只能上传一个文件，请删除其他文件再上传。')
            return
          }
          plupload.each(files, file => {
            if (this.imageOnly) {
              this.previewImage(file, imgsrc => {
                this.$set(file, 'imgsrc', imgsrc)
              })
            }
            self.files.push(file)
          })
          if (self.autoUpload) {
            self.upload()
          }
          self.$emit('added', up, files)
        })

        self.uploader.bind('BeforeUpload', (up, file) => {
          self.setUploadParam(up, file)
          self.$emit('before', up, file)
        })
        
        self.uploader.bind('UploadProgress', (up, file) => {
          self.$emit('progress', up, file)
        })

        self.uploader.bind('FileUploaded', (up, file) => {
          // if (info.status == 200) {
          //   file.message = 'upload to oss success, object name:' + get_uploaded_object_name(file.name) + ' 回调服务器返回的内容是：' + info.response;
          // } else if (info.status == 203) {
          //   file.message = '上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是：' + info.response;
          // } else {
          //   file.message = info.response
          // }
          // console.log(file)
          // update sql
          const postData = []
          const jsonFile = {}
          jsonFile.fileOldName = file.name
          jsonFile.fileSize = file.size
          jsonFile.filePath = file.objectName
          postData.push(jsonFile)
          console.log(jsonFile)
          const random = this.randomString(4)
          addFileInfo(postData, random).then(response => {
            // getFileInfoByIds(str).then(response => {
            //   console.log(response)
            // })
            file.id = response
            // console.log(response)
            self.updateModel()
          })
          self.$emit('uploaded', up, file, result)
        })

        self.uploader.bind('Error', function(up, err) {
          if (err.code === -600) {
            self.$message('选择的文件太大了，上传文件大小最大100M')
          } else if (err.code === -601) {
            self.$message('选择的文件后缀不对，可以根据对应情况，在upload.js进行设置可允许的上传文件类型')
          } else if (err.code === -602) {
            self.$message('这个文件已经上传一遍了')
          } else {
            this.$message.error(err.message)
          }
          self.$emit('error', up, err)
        })

        self.uploader.init()
      })
    },
    // plupload中为我们提供了mOxie对象
    // 有关mOxie的介绍和说明请看： https://github.com/moxiecode/moxie/wiki/API
    // 如果你不想了解那么多的话，那就照抄本示例的代码来得到预览 的图片吧
    previewImage(file, callback) {
      // file为plupload事件监听函数参数中的file对象，callback为预览图片准备完成的回调函数
      if (!file || !/image\//.test(file.type)) {
        return // 确保文件是图片
      }
      if (file.type === 'image/gif') {
        // gif使用FileReader进行预览，因为mOxie.Image只支持jpg和png
        let fr = new plupload.moxie.FileReader()
        fr.onload = function() {
          callback(fr.result)
          fr.destroy()
          fr = null
        }
        fr.readAsDataURL(file.getSource())
      } else {
        let preloader = new plupload.moxie.image.Image()
        preloader.onload = function() {
          preloader.downsize(300, 300) // 先压缩一下要预览的图片，宽300，高300
          const imgsrc = preloader.type === 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80)
          : preloader.getAsDataURL() // 得到图片src，实质为一个base64编码的数据
          if (callback) {
            callback(imgsrc) // callback传入的参数为预览图片的url
          }
          preloader.destroy()
          preloader = null
        }
        preloader.load(file.getSource())
      }
    },
    openPreview(val) {
      this.selectImage = val
      this.dialogVisible = true
    },
    cancel() {
      this.dialogVisible = false
    }
  },
  mounted() {
    switch (this.mode) {
      case 'drop':
        this.enableDrop = true
        this.autoUpload = true
        break
      default: 
        break
    }
    this.loadData()
    this.renderPlupload()
  },
  created() {
    if (this.imageOnly) {
      const mime_types = [
        // 只允许上传图片文件
        { title: '图片文件', extensions: 'jpg,gif,png' }
      ]
      this.$set(uploaderDefaultOption.filters, 'mime_types', mime_types)
    }
    if (this.singleSelect) {
      const multi_selection = false
      this.$set(uploaderDefaultOption, 'multi_selection', multi_selection)
    }
    if (this.entryHeader) {
      this.entryHeaders = { Entry: 'newer' }
    }
  }
}
</script>

<style lang="scss" scoped>
.shuoming {
  font-size: 16px;
}
.clickupload {
  color: #409eff;
}
.elicon {
  font-size: 50px;
}
.drag-area {
  height: 150px;
  line-height: 25px;
  text-align: center;
  color: #aaa;
  width: 100%;
  margin: 10px auto;
  user-select: none;
  cursor: pointer;
}
</style>
