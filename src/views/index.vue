<template>
  <div class="page centerd flex-col">
    <div style="padding:2rem;">
        <img width="200" src="./assets/images/mongo.svg" />
    </div>
    <div>
      <el-button type="primary" @click="play">游玩</el-button>
      <el-button type="primary" plain @click="setting">设置</el-button>
    </div>
  </div>
</template>

<script>
export default {
    methods:{
        play() {
            location.href = '/game.html'
        },
        setting() {
            this.$router.push('/setting')
        }
    }
};
</script>

<style lang="less" scoped>
.page {
    background-color: #b8b8b8;
}
.flex-col {
  flex-direction: column;
}
</style>