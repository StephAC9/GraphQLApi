<template>
<div>
  <div style="backgroud: rgb(153, 149, 149,1)">
      <v-btn class="btn" dark @click="openKitchen">Rooms</v-btn>
  </div>
</div>
  
</template>

<script>
import {
    mdiDelete,
    mdiHeart
  } from '@mdi/js'
  export default {
    name:'RouterBtn',

    data () {
      return {
        dialog: false,
        icons: {
                mdiDelete,
                mdiHeart
            },
      }
    },

    methods:{
      openFavorites(){
        this.$router.push({name:'houseBoard'})
      },
    },
  }
</script>

<style scoped>

    @media screen and (max-width: 660px) {
        .btn{
            font-size:5px;
            margin-right:5px;
            width: 30px;
        }
    }
</style>