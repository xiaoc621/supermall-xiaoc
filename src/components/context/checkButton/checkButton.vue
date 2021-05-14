<template>
<div class="check-button" :class="{check:isChecked}">
    <img src="../../../assets/images/checkbutton/checkbutton.png" alt="">
</div>
</template>

<script>
export default {
   name:'checkButton',
   props:{
       isChecked:{
           type:Boolean,
           default:false
       }
   }
}
</script>
<style scoped>
.check-button{
    border-radius: 50%;
    border: 2px solid #aaa;
    /* border-color: 5px solid black; */
    margin-right: 4px;
}
img{
    width: 20px;
    height: 20px;
}
.check{
    border-color:red;
    background-color:red;
}
</style>