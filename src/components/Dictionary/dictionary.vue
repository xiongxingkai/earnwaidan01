<template>
  <div>
    <div>
      <el-select :size="size" v-model="selectedNotice" filterable value-key="value" :loading="noticeLoading" @change="selectedNoticeChange" :disabled="disabled"></el-select>
      <el-option v-for="item in noticeOption" :key="item.value" :label="item.name" :value="item">
        <span style="font-size: 13px;">{{item.name}}</span>
      </el-option>
    </div>
  </div>
</template>
<script>
import { dictionaryDatabase } from '@/api/notice/inform-management/index.js'
export default {
  name: 'dictionaryBase',
  props: {
    value: {
      type: Object,
      default: {
        code: '',
        name: ''
      }
    },
    size: {
      type: String,
      default: 'mini'
    },
    urlname: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedNotice: undefined,
      noticeLoading: undefined,
      noticeOption: undefined
    }
  },
  methods: {
    initNoticetList() {
      dictionaryDatabase(this.urlname).then(response => {
        if (response.status === 200) {
          this.noticeOption = response.data.map(item => {
            const value = item.num
            if (this.value.code === item.code) {
              this.value.name = item.name
            }
            return {
              value,
              name: item.name,
              code: item.code
            }
          })

          if (this.value.code !== undefined || this.value.code !== '') {
            this.selectedNotice = this.value.name
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
      this.$emit('input', {
        name: item.name,
        code: item.code
      })
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal.code !== oldVal.code) {
        this.initNoticetList()
      }
    }
  },
  mounted() {
    this.initNoticetList()
  }


}
</script>
