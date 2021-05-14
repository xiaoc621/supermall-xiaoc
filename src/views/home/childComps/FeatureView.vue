<template>
  <div class="feature">
      <a href="https://act.mogujie.com/zzlx67">
      <img src="../../../assets/images/home/recommend_bg.jpg" alt="">
      </a>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper'
	export default {
		name: "HomeSwiper",
        props:{
            banners:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components: {
        Swiper,
        SwiperItem
     },
	}
</script>

<style scoped>
 img{
     width: 100%;
 }
</style>