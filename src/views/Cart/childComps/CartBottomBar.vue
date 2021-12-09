<template>
    <div class="bottom-bar">
        <div class="button">
            <check-button :is-check='isSelectAll' class="check-button" @click.native="checkAll"></check-button>
            <span>全选</span>
        </div>
        <div class="total-price">
            合计：{{totalPrice}}
        </div>
        <div class="calculate" @click="calcClick">
            去计算({{counted}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
    //   return '￥' + this.$store.state.cartList.filter(item => {
      return '￥' + this.cartList.filter(item => {  // mapGetters结构之后这样写
          return item.checked}).reduce((preValue,item) => {
              return preValue + item.price * item.count
          },0).toFixed(2) // toFixed(2) 计算结果保留2位小数
    },
    counted () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      if(this.cartList.length === 0) return false  // 购物车中没有商品时，默认不选中
      return !(this.cartList.find(item => !item.checked)) // (括号里面有值的情况下再取反，结果就为false)
  
    }
  },
  methods: {
    checkAll () {
      if(this.isSelectAll){ // 全部选中时
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }

    },
    calcClick () {
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',1000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    position: relative;
    z-index: 99;
    display: flex;
    text-align: center;
    font-size: 14px;
}
.button {
    display: flex;
    align-items: center;
    margin-left: 8px;
    width: 60px;
}
.check-button {
    width: 18px;
    height: 18px;
    line-height: 20px;
    margin-right: 5px;
}
.total-price {
    margin-left: 20px;
    flex: 1;
}
.calculate {
    width: 100px;
    background-color: pink;
}
</style>
