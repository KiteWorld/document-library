<template>
  <!-- <div>
    <div class="text">{{ text }}</div>
    <input type="text" v-model="text" />
  </div> -->
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '测试vue'
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.text {
  color: red;
}
</style>