<template >
  <div>
    <div>'vuex-state:'{{ text }}</div>
    <div>'vuex-getter:'{{ getText }}</div>
    <p class="test">123１２３</p>
    <button @click="setText(123)">
      １２３１２３１1231223１１123123２３１1231231231231231223２３２３２３
    </button>
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
  created() {
    //测试 asycn/await(ES6+)语法是否支持
    this.test()
    const a = 1
    debugger
    throw 123
    //测试环境全局变量
    console.log('BASE_URL:', process.env.BASE_URL)
  },
  methods: {
    ...mapActions(['setText']),
    async test() {
      const a = await this.test1()
    },
    async test1() {
      return 123
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  color: rgb(199, 145, 78);
}
</style>