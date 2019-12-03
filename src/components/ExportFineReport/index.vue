<template>
  <a :href="url" target="_blank">导出</a>
</template>
<script>
/**
 调用示例
 <export-fine-report :reportlet='HrDetailExport'
 :apiUrl='/api/{project}/{supervise}/{project}/page'
 :field='f1,f2'
 :param="'&ID=' + id + '&photo=' + photo">
 </export-fine-report>
 */
import config from '../../config/config'
import { getToken } from '@/utils/auth'
export default {
  name: 'exportFineReport',
  props: {
    reportlet: {
      type: String,
      default: ''
    },
    apiUrl: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      default: ''
    },
    param: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: 'excel'
    }
  },
  data() {
    return {
      url: undefined
    }
  },
  created() {
    let url = config.REPORT_URL + 'ReportServer?reportlet=' + reportlet + '.cpt&format=' + format + '&extype=simple'
    url += '&apiUrl=' + config.BASE_API + apiUrl + '&field=' + field + '&token=' + getToken()
    this.url = url + param
  }
}
</script>
