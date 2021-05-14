<template>
<div class="bottom-bar">
    <div class="check-context">
        <check-button class="check-button" 
        :is-checked="isSelectAll" @click.native="checkClick"></check-button>
        <span>全选</span>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">提交订单({{checkLength}})</div>
</div>
</template>

<script>
import checkButton from '../../../components/context/checkButton/checkButton'
export default {
         name:'cartBottomBar',
         components:{
             checkButton
         },
         computed:{
             totalPrice(){
                return '￥' + this.$store.state.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue,item) => {
                    return preValue + item.price*item.count
                },0).toFixed(2)
             },
            checkLength(){
                return this.$store.state.cartList.filter(item => item.checked).length
            },
            isSelectAll(){
              if(this.$store.state.cartList.length === 0) return false
                return !this.$store.state.cartList.find(item => !item.checked)
                // return this.$store.state.cartList.every(item => item.checked)
            }
         },
         methods: {
             checkClick(){
                 if(this.isSelectAll){
                     this.$store.state.cartList.forEach(item => item.checked = false)
            } else{
                this.$store.state.cartList.forEach(item => item.checked = true)
            }
         },
         calcClick(){
             if(!this.isSelectAll){
                     this.$toast.show('请选择购买的商品',2000)
             }
         }
     }
}
</script>
<style scoped>
.bottom-bar{
    display: flex;
    height: 40px;
    background-color:#eee;
    position: relative;
    line-height: 40px;
    font-size: 14px;
}
.check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
}
.check-context{
    display: flex;
    align-items: center;
    margin-left: 10px;
}
.price{
    margin-left: 70px;
    flex: 1;
}
.calculate{
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
}
</style>