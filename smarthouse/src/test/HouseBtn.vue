<template>
  <div style="backgroud: rgb(153, 149, 149,1)">
      <v-btn 
        class="btn"
        style="font-size:10px;
            margin-right:5px;" dark 
        @click="openHouse">
        <span>
        <v-icon color="red">
          mdi-home
          </v-icon>
          </span>
          TestHouse
      </v-btn>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const {mapGetters} = createNamespacedHelpers('owner')
import {
    mdiDelete,
    mdiHeart
  } from '@mdi/js'
  export default {
    name:'HouseBtn',

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
      openHouse(){
        this.$router.push({name:'test-house'})
      }
    },
  }
</script>

<style scoped>

</style>