<template>
    <div class="GoodsListItem" @click="itemClick">
        <img :src="showImage" alt="" @load="imageload">
        <div class="goodsinfo">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'GoodsListItem',
    props:{
        goodsItem:{
            type:Object,
            default(){
                return []
            }
        }
    },
    computed:{
      showImage(){
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageload(){
        this.$bus.$emit('itemImageLoad')
      },
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    },

}
</script>
<style scoped>
.GoodsListItem {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  img {
    width: 100%;
    height: 253.8px;
    border-radius: 5px;
    
  }
  .goodsinfo {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goodsinfo p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goodsinfo .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goodsinfo .collect {
    position: relative;
  }
  .goodsinfo .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/images/common/collect.png") 0 0/14px 14px;
  }
</style>