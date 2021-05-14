<template>
    <div class="shopCart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <cart-list></cart-list>
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>
<script>
import NavBar from '../../components/common/navbar/NavBar'
import cartList from './childComps/cartList'
import cartBottomBar from './childComps/cartBottomBar'

import {mapGetters} from 'vuex'

export default {
    name:'shopCart',
    components:{
         NavBar,
         cartList,
         cartBottomBar
    },
    computed:{
        ...mapGetters(['cartLength', 'cartList'])
    }
}
</script>
<style scoped>
.shopCart{
    height: 100vh;
}
.nav-bar{
    background-color: var(--color-tint);
    color:#fff;
    }
</style>