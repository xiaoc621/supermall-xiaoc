import {debounce} from './utls'
import BackTop from '../components/context/backTop/BackTop'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener:null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh,50)
        this.itemImgListener = () => {
              refresh ()
        }
        this.$bus.$on('itemImgLoad',this.itemImgListener)
    },
}

export const backTopMixin = {
    components:{
        BackTop
    },
    data() {
        return {
            isShowBackTop:false
        }
    },
    methods: {
        backTopClick(){
            this.$refs.scroll.scroll.scrollTo(0,0)
        }
    },
}

export const imgMixin = {
    data(){
      return {
        imgListener:null
      }
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 100)
      this.imgListener = () => {
        refresh();
      };
      debounce(this.$bus.$on('imgLoad', this.imgListener))
    }
  }