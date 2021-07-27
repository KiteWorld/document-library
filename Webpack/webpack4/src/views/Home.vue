<template >
  <div>
    <div>'vuex-state:'{{ text }}</div>
    <div>'vuex-getter:'{{ getText }}</div>
    <button @click="setText(123)">修改state的值</button>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex"
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['text']),
    ...mapGetters(['getText'])
  },
  methods: {
    ...mapActions(['setText'])
  }
}
</script>

<style lang="less" scoped>
</style>