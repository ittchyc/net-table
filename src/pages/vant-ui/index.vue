<template>
  <div class="box">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" loop>
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      autoplay: 3000
    }
  },
  methods: {

  },
  created () {

  }
}
</script>

<style lang="less" scoped>
  .box{
    width: 80%;
    margin: 0 auto;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 350px;
    text-align: center;
    &:nth-child(1){
      background-color: #39a9ed;
    }
    &:nth-child(2){
      background-color: #67C23A;
    }
    &:nth-child(3){
      background-color: #E6A23C;
    }
    &:nth-child(4){
      background-color: #F56C6C;
    }
  }
</style>
