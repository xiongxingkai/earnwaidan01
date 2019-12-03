<template>
  <div>
    <div>
      <el-select :size="sizeLg" v-model="selectedNotice" filterable value-key="code"  @change="selectedNoticeChange" :disabled="disabled">
        <el-option v-for="item in noticeOption" :key="item.value" :label="item.name" :value="item">
          <!-- <span style="font-size: 13px;">{{item.name}}</span> -->
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import { dictionaryDatabase } from '@/api/notice/inform-management/index.js'
export default {
  name: 'dictionaryBase',
  props: {
    value: {
      required: true
    },
    size: {
      type: String,
      default: 'medium'
    },
    urlname: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sizeLg() {
      return this.size === 'small' || this.size === 'mini' ? this.size : 'medium'
    }
  },
  data() {
    return {
      selectedNotice: undefined,
      noticeOption: undefined
    }
  },
  watch: {
    value() {
      this.handleView()
    },
    urlname(newVal) {
      this.initNoticetList(this.urlname)
    }
  },
  mounted() {
    this.initNoticetList(this.urlname)
  },
  methods: {
    initNoticetList(urlname) {
      dictionaryDatabase(urlname).then(response => {
        if (response.status === 200) {
          if (response.data !== null && response.data.length > 0) {
            this.noticeOption = response.data.map(item => ({
              name: item.name,
              code: item.code
            }))
            this.handleView()
          }
        } else {
          this.$message({
            title: '失败',
            type: 'error',
            message: response.message
          })
        }
      })
    },
    selectedNoticeChange(item) {
      if (typeof this.value !== 'object') {
        this.$emit('input', item.code)
      } else if (this.value !== null) {
        this.$emit('input', {
          name: item.name,
          code: item.code
        })
      } else {
        this.$emit('input', item.code)
      }
    },
    // 根据props传入的数据来进行动态的赋值给selectedNotice
    handleView() {
      if (typeof this.value !== 'object') {
        if (this.noticeOption != null && this.noticeOption.lneght > 0) {
          const arr = this.noticeOption.filter(item => item.code === this.value)
          this.selectedNotice = arr[0] ? arr[0] : this.value
        }
      } else if (this.value !== null) {
        const arr = this.noticeOption.filter(item => item.code === this.value.code)
        this.selectedNotice = arr[0] ? arr[0] : this.value
      } else {
        this.selectedNotice = ''
      }
    }
  }


}
</script>
