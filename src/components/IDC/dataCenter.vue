<template>
  <div>
    <iframe id="iframe" width="100%" height="900px" :src="url" frameborder="0"></iframe>
  </div>
</template>
<script>
import configJs from './../../../config/config.js'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'datacenter',
  computed: {
    ...mapGetters(['token'])
  },
  data() {
    return {
      address: '',
      url: ''
    }
  },
  methods: {
    aa() {
      this.url = configJs.PLATFORM_ADMIN + '/?token=' + getToken()
    }
  },
  mounted() {
    this.aa()
  }
}
</script>
