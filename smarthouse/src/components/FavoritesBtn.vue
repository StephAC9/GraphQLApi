<template>
  <div style="backgroud: rgb(200, 200, 200,1)">
      <v-btn 
        class="btn" 
        style="font-size:10px;
            margin-right:5px;" dark 
        @click="openFavorites">
        <span>
        <v-icon color="red">
          mdi-heart
          </v-icon>
          </span>
          Favorites devices
      </v-btn>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {
    mdiDelete,
    mdiHeart
  } from '@mdi/js'
  export default {
    name:'FavoritesBtn',
    props:['houseId'],

    data () {
      return {
        dialog: false,
        icons: {
                mdiDelete,
                mdiHeart
            },
      }
    },
    computed:{
      ...mapGetters('house',['currentHouseId'])
    },

    methods:{
      openFavorites(){
        console.log('House: ',this.currentHouseId)
        this.$store.dispatch('device/setFavorites',{houseId: this.currentHouseId})
        this.$router.push({name:'favorites'})
      }
    },
  }
</script>

<style scoped>

  /*   @media screen and (max-width: 660px) {
        .btn{
            font-size:5px;
            margin-right:5px;
            width: 30px;
        }
    } */
</style>