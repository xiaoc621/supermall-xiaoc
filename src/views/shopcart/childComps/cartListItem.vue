<template>
<div id="shop-item">
    <div class="item-selector">
        <check-button :is-checked="itemInfo.checked" @click.native="checkClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="" />
    </div>
    <div class="item-info">
       <div class="item-title">{{ itemInfo.title }}</div>
       <div class="item-desc">{{ itemInfo.desc }}</div>
       <div class="info-bottom">
         <div class="item-price">￥{{ itemInfo.price }}</div>
         
         <div class="item-count">x{{ itemInfo.count }}</div>
       </div>
    </div>
  </div>
</template>

<script>
import checkButton from '../../../components/context/checkButton/checkButton'
export default {
       name:'cartListItem',
       components:{
           checkButton
       },
       props:{
           itemInfo:{
           type:Object,
           default(){
               return{}
       }
     }
   },
   methods: {
       checkClick(){
           this.itemInfo.checked = !this.itemInfo.checked
       }
   },
}
</script>
<style scoped>
#shop-item{
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}
.item-selector{
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.item-title{
    margin-top: 0;
    font-size: 18px;
}
.item-desc{
    font-size: 10px;
}
.item-title, .item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.item{
    padding: 5px;
}
.item-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
}
.item-info{
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;

}
.item-info .item-desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
}
.info-bottom{
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
}
.info-bottom .item-price{
    color: orangered;
}
.item-price{
  float: left;
}
.item-count{
    float: right;
    margin-right: 5px;
}
</style>