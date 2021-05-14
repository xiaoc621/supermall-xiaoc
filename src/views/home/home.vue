<template>
    <div id="home">
        <nav-bar class="home-bav"><div slot="center">购物车</div></nav-bar>
        <tab-control :titles="['流行', '新款' ,'精选']"  
                @tabClick="tabClick"
                ref="tabControl1"
                class="acb" v-show="isTabFixed"/>
    
        <scroll class="content" 
        ref="scroll" 
        :probe-type="3" 
        @scroll="contentScroll" 
        :pull-up-load="true"
        @pullingUp="loadMore">
                <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
                <recommend-view :recommends="recommends"></recommend-view>
                <feature-view></feature-view>
                <tab-control :titles="['流行', '新款' ,'精选']"  
                @tabClick="tabClick"
                ref="tabControl2"></tab-control>
                <goods-list :goods="showGoods"></goods-list>
        </scroll> 
        <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>  
    </div>
</template>
<script>
import NavBar from '../../components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from '../../components/context/tabControl/TabControl'
import GoodsList from '../../components/context/goods/GoodsList'
import GoodsListItem from '../../components/context/goods/GoodsListItem'
import {getHomeMultidata, getHomeGoods} from '../../network/home'
import Scroll from '../../components/common/scroll/Scroll'
import {debounce} from '../../common/utls'
import {itemListenerMixin,backTopMixin} from '../../common/ximin'





export default {
    name:'home',
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsListItem,
        GoodsList,
        Scroll
     },
     mixins:[itemListenerMixin,backTopMixin],
     data(){
        return{
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0, list: []},
                'new':{page:0, list: []},
                'sell':{page:0, list: []},
            },
            currentType:'pop',
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0
        }
     },
     computed:{
         showGoods(){
             return this.goods[this.currentType].list
         }
     },
     destroyed() {
         
     },
     activated() {
         this.$refs.scroll.scrollTo(0,this.saveY,0.1)
         this.$refs.scroll.refresh()
     },
     deactivated() {
        //保存y值
         this.saveY = this.$refs.scroll.getScrollY()
        // 取消全局事件监听
        this.$bus.$off('itemImgLoad',this.itemImgListener)
     },
     created(){
         this.getHomeMultidata()
         this.getHomeGoods('pop')
         this.getHomeGoods('new')
         this.getHomeGoods('sell')

         
     },
     mounted() {
         this. tabOffsetTop = this.$refs.tabControl
     },

     methods: {
        tabClick(index){
        switch(index){
            case 0 :
            this.currentType = 'pop'
            break
        
            case 1:
            this.currentType = 'new'
            break
        
            case 2 :
            this.currentType = 'sell'
            break
          }
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
         },
         backTopClick(){
             this.$refs.scroll.scroll.scrollTo(0,0)
         },
         contentScroll(position){
                this.isShowBackTop = (-position.y) > 1000;
                this.isTabFixed = (-position.y) > this.tabOffsetTop
         },
         loadMore(){
             this.getHomeGoods(this.currentType)
         },
         swiperImageLoad(){
             this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
         },
          getHomeMultidata(){
              getHomeMultidata().then(res => {
             this.banners = res.data.banner.list;
             this.recommends = res.data.recommend.list;
         })
        },
          getHomeGoods(type){
              const page = this.goods[type].page + 1
              getHomeGoods(type, page).then(res => {
                  this.goods[type].list.push(...res.data.list)
                  this.goods[type].page += 1

                  this.$refs.scroll.finishPullUp()
        })
        }  
     }
}
</script>
<style scoped>
#home{
    height: 100vh;
    position: relative;
}
.home-bav{
    background-color: var(--color-tint);
    color:#fff;
}
.content{
    overflow: scroll;
    position: absolute;
    top: 44px;
    bottom: 0px;
    right: 0;
    left: 0;
}
.acb{
  position: relative;
  z-index: 9;
}
::-webkit-scrollbar {
    width: 0px;            
 }
</style>