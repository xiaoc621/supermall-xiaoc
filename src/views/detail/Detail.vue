<template>
<div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <div class="sss">
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
    <detail-param-info :param-info="ParamInfo" ref="params"></detail-param-info>
    <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
    <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    </div>
    <detail-bottom-bar class="cd" @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
</div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from '../detail/childComps/DetailSwiper'
import DetailBaseInfo from '../detail/childComps/DetailBaseInfo'
import DetailShopInfo from '../detail/childComps/DetailShopInfo'
import Scroll from '../../components/common/scroll/Scroll'
import DetailGoodsInfo from '../detail/childComps/DetailGoodsInfo'
import DetailParamInfo from '../detail/childComps/DetailParamInfo'
import DetailCommentInfo from '../detail/childComps/DetailCommentInfo'
import DetailBottomBar from '../detail/childComps/DetailBottomBar'
import GoodsList from '../../components/context/goods/GoodsList'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '../../network/detail'
import {debounce} from '../../common/utls'
import {itemListenerMixin,backTopMixin} from '../../common/ximin'
import {mapActions} from 'vuex'


export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
    },
    mixins:[itemListenerMixin,backTopMixin],
    data() {
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            ParamInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0,
            message:'',
            show:false
        }
    },
    created() {
        this.iid = this.$route.params.iid
        getDetail(this.iid).then(res =>{
            // 获取数据
            const data = res.result;
            // 获取轮播图的数据
            this.topImages = data.itemInfo.topImages
            // 创建商品的对象
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            // 获取店铺的信息
            this.shop = new Shop(data.shopInfo)
            // 获取详情的信息
            this.detailInfo = data.detailInfo
            // 获取参数的信息
            this.ParamInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            // 获取评论信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
            }
        })
        getRecommend().then(res => {
                this.recommends = res.data.list
            })
        this.getThemeTopY = debounce(()=>{
                  this.themeTopYs = []
                  this.themeTopYs.push(0)
                  this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                  this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                  this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            },100)
    },
    mounted() {

    },
    destroyed() {
        this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods: {
        ...mapActions(['addCart']),
        imgLoad(){
            this.$refs.scroll.refresh()
            this.getThemeTopY ()
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        },
        contentScroll(position){
            const positionY = -position.y
            let length = this.themeTopYs.length
            for(let i = 0; i < length;i++){
                if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] 
                && positionY < this.themeTopYs[i+1]) || (i === length-1 && positionY >= this.themeTopYs[i]))){
                     this.currentIndex = i
                     this.$refs.nav.currentIndex =this.currentIndex
                }
            }
            this.isShowBackTop = (-position.y) > 1000
        },
        addToCart(){
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.nowPrice
            product.iid = this.iid

            // this.$store.dispatch('addCart',product).then(res => {})
            this.addCart(product).then(res => {
                console.log(this.$toast);
                this.$toast.show(res,2000)
            })
        }
    }
}
</script>
<style scoped>
#detail{
    position: relative;
    z-index:9;
    background-color: #ffffff;
    height: 100vh;
}
.detail-nav{
    position: relative;
    z-index:9;
    background-color: #fff;
}
.sss{
    height: calc(100% - 44px - 49px);
}
.content{
    position: relative;
    height: 100%;
    overflow: hidden;
}
.cd{
    position: relative;
}
</style>